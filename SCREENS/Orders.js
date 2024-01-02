import { useEffect, useState } from "react";
import {
  AsyncImage,
  ButtonOne,
  IconButtonTwo,
  LinkOne,
  SafeArea,
  SegmentedPicker,
  Spacer,
  backgrounds,
  bus,
  colors,
  coords,
  firebase_GetAllDocumentsListener,
  format,
  function_GetDirections,
  layout,
  me,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MenuBar } from "../EVERYTHING/MenuBar";

export function Orders({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState("In Process");
  const [chosenOrderID, setChosenOrderID] = useState("");
  //
  const taxes = 0.0875;
  useEffect(() => {
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "Orders",
      setOrders,
      0,
      "desc",
      "Date",
      "UserID",
      "==",
      me.id, 
    );
  }, []);

  return (
    <SafeArea
      loading={loading}
      statusBar={"light"}
      styles={[{ backgroundColor: "#000000" }]}
    >
      <View style={[{ flex: 1 }]}>
        <View style={[layout.padding, layout.separate_horizontal]}>
          <Text style={[colors.white, sizes.medium_text]}>My Orders</Text>
          <IconButtonTwo
            name="menu-outline"
            size={30}
            color={"white"}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{ backgroundColor: "#1A1A1A" }, layout.padding]}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              <SegmentedPicker
                options={["In Process", "Completed"]}
                setter={setStatus}
                backgroundColor={"#1BA8FF"}
                value={status}
                color={"white"}
                size={14}
              />
            </ScrollView>
            <Spacer height={15} />
            <View>
              {orders.length > 0 ? (
                <View>
                  {status === "In Process" && (
                    <View style={[layout.vertical]}>
                      {orders
                        .filter(
                          (o) =>
                            o.Status === "Preparing" || o.Status === "Ready"
                        )
                        .map((order, i) => {
                          return (
                            <TouchableOpacity
                              key={i}
                              style={[
                                { backgroundColor: "#F2F3F7" },
                                layout.padding,
                                format.radius,
                              ]}
                              onPress={() => {
                                if (chosenOrderID !== order.id) {
                                  setChosenOrderID(order.id);
                                  //   GET ITEMS HERE
                                  setLoading(true);
                                  firebase_GetAllDocumentsListener(
                                    setLoading,
                                    "OrderItems",
                                    setOrderItems,
                                    0,
                                    "asc",
                                    "Name",
                                    "OrderID",
                                    "==",
                                    order.id
                                  );
                                } else {
                                  setChosenOrderID("");
                                }
                              }}
                            >
                              <View
                                style={[
                                  layout.separate_horizontal,
                                  { alignItems: "flex-start" },
                                ]}
                              >
                                <View>
                                  <Text
                                    style={[
                                      sizes.medium_text,
                                      format.all_caps,
                                      format.bold,
                                    ]}
                                  >
                                    Order #{order.id.slice(-8)}
                                  </Text>
                                  <Text>
                                    {new Date(
                                      order.Date.seconds * 1000
                                    ).toLocaleDateString("en-US", {
                                      month: "2-digit",
                                      day: "2-digit",
                                      year: "numeric",
                                    })}{" "}
                                    {new Date(
                                      order.Date.seconds * 1000
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={[{ color: "#117DFA", fontSize: 16 }]}
                                  >
                                    {order.Status}
                                  </Text>
                                </View>
                              </View>
                              {chosenOrderID === order.id && (
                                <View style={[layout.vertical]}>
                                  <Spacer heigt={10} />
                                  {orderItems.map((item, j) => {
                                    return (
                                      <View
                                        key={j}
                                        style={[
                                          {
                                            borderBottomWidth: 1,
                                            borderBottomColor:
                                              "#rgba(0,0,0,0.2)",
                                            paddingBottom: 10,
                                          },
                                        ]}
                                      >
                                        <View style={[layout.horizontal]}>
                                          <View
                                            style={[{ width: 70, height: 70 }]}
                                          >
                                            <AsyncImage
                                              path={item.ImagePath}
                                              width={70}
                                              height={70}
                                            />
                                          </View>
                                          <View>
                                            <Text style={[sizes.medium_text]}>
                                              {item.Name}
                                            </Text>
                                            <Text>
                                              Total: ${item.Total.toFixed(2)}
                                            </Text>
                                            {item.Options !== "" && (
                                              <View
                                                style={[
                                                  layout.margin_vertical,
                                                  {
                                                    borderLeftWidth: 2,
                                                    borderLeftColor: "#28D782",
                                                    paddingLeft: 6,
                                                  },
                                                ]}
                                              >
                                                <Text>
                                                  {item.Options.replaceAll(
                                                    "jjj",
                                                    "\n"
                                                  )}
                                                </Text>
                                              </View>
                                            )}
                                          </View>
                                        </View>
                                        {item.Details !== "" && (
                                          <View
                                            style={[
                                              {
                                                backgroundColor:
                                                  "rgba(0,0,0,0.05)",
                                              },
                                              layout.padding,
                                              format.radius,
                                            ]}
                                          >
                                            <Text>
                                              {item.Details.replaceAll(
                                                "jjj",
                                                "\n"
                                              )}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                    );
                                  })}
                                </View>
                              )}
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  )}
                  {/* COMPLETED */}
                  {status === "Completed" && (
                    <View style={[layout.vertical]}>
                      {orders
                        .filter(
                          (o) =>
                            o.Status === "Completed" || o.Status === "Refunded"
                        )
                        .map((order, i) => {
                          return (
                            <TouchableOpacity
                              key={i}
                              style={[
                                backgrounds.white,
                                layout.padding,
                                format.radius,
                                {
                                  borderWidth: 1,
                                  borderColor: "rgba(0,0,0,0.1)",
                                },
                              ]}
                              onPress={() => {
                                if (chosenOrderID !== order.id) {
                                  // GET ITEMS
                                  setLoading(true);
                                  firebase_GetAllDocumentsListener(
                                    setLoading,
                                    "OrderItems",
                                    setOrderItems,
                                    0,
                                    "asc",
                                    "Name",
                                    "OrderID",
                                    "==",
                                    order.id
                                  );
                                  setChosenOrderID(order.id);
                                } else {
                                  setChosenOrderID("");
                                }
                              }}
                            >
                              <View
                                style={[
                                  layout.separate_horizontal,
                                  { alignItems: "center" },
                                ]}
                              >
                                <Text
                                  style={[
                                    format.all_caps,
                                    sizes.medium_text,
                                    format.bold,
                                  ]}
                                >
                                  Order #{order.id.slice(-8)}
                                </Text>
                                <Text
                                  style={[
                                    sizes.medium_text,
                                    {
                                      color:
                                        order.Status === "Completed"
                                          ? "blue"
                                          : "red",
                                    },
                                  ]}
                                >
                                  {order.Status}
                                </Text>
                              </View>
                              <Text style={[sizes.medium_text]}>
                                {order.Name}
                              </Text>
                              <Text>
                                {new Date(
                                  order.Date.seconds * 1000
                                ).toLocaleDateString() +
                                  " " +
                                  new Date(
                                    order.Date.seconds * 1000
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                              </Text>

                              {/* SELECTED */}

                              <View>
                                {chosenOrderID === order.id && (
                                  <View style={[layout.vertical]}>
                                    <Spacer height={15} />
                                    {orderItems.map((item, j) => {
                                      return (
                                        <View
                                          key={j}
                                          style={[
                                            layout.padding_vertical,
                                            {
                                              borderBottomColor:
                                                "rgba(0,0,0,0.2)",
                                              borderBottomWidth: 1,
                                            },
                                          ]}
                                        >
                                          <View style={[layout.horizontal]}>
                                            <View
                                              style={[
                                                { width: 70, height: 70 },
                                              ]}
                                            >
                                              <AsyncImage
                                                path={item.ImagePath}
                                                width={70}
                                                height={70}
                                              />
                                            </View>
                                            <View>
                                              <Text style={[sizes.medium_text]}>
                                                {item.Name}
                                              </Text>
                                              <Text style={[sizes.medium_text]}>
                                                {item.Quantity} x
                                              </Text>
                                              <View style={[layout.horizontal]}>
                                                <Text
                                                  style={[
                                                    {
                                                      textDecorationLine:
                                                        item.AmountRefunded > 0
                                                          ? "line-through"
                                                          : "none",
                                                    },
                                                  ]}
                                                >
                                                  Item Total: $
                                                  {item.Total.toFixed(2)} -
                                                </Text>
                                                <Text>
                                                  $
                                                  {(
                                                    item.Total / item.Quantity
                                                  ).toFixed(2)}{" "}
                                                  ea
                                                </Text>
                                              </View>
                                              {item.AmountRefunded > 0 && (
                                                <Text
                                                  style={[{ color: "red" }]}
                                                >
                                                  - ${item.AmountRefunded}{" "}
                                                  refunded
                                                </Text>
                                              )}
                                            </View>
                                          </View>
                                          {/* DESCRIPTION */}
                                          {item.Options !== "" && (
                                            <View
                                              style={[
                                                {
                                                  marginLeft: 10,
                                                  paddingLeft: 15,
                                                  borderLeftWidth: 2,
                                                  borderLeftColor: "#28D782",
                                                },
                                                layout.margin_vertical,
                                              ]}
                                            >
                                              <Text style={[sizes.medium_text]}>
                                                {item.Options.replaceAll(
                                                  "jjj",
                                                  "\n"
                                                )}
                                              </Text>
                                            </View>
                                          )}
                                          {item.Details !== "" && (
                                            <View
                                              style={[
                                                {
                                                  backgroundColor:
                                                    "rgba(0,0,0,0.05)",
                                                },
                                                layout.padding,
                                                format.radius,
                                                layout.margin_vertical,
                                              ]}
                                            >
                                              <Text style={[sizes.medium_text]}>
                                                {item.Details.replaceAll(
                                                  "jjj",
                                                  "\n"
                                                )}
                                              </Text>
                                            </View>
                                          )}
                                        </View>
                                      );
                                    })}
                                    <View style={[layout.margin_vertical]}>
                                      <View>
                                        <View
                                          style={[layout.separate_horizontal]}
                                        >
                                          <Text style={[sizes.small_text]}>
                                            Subtotal:
                                          </Text>
                                          <Text>
                                            $
                                            {orderItems
                                              .reduce(
                                                (acc, item) => acc + item.Total,
                                                0
                                              )
                                              .toFixed(2)}
                                          </Text>
                                        </View>
                                        <View
                                          style={[layout.separate_horizontal]}
                                        >
                                          <Text style={[sizes.small_text]}>
                                            Tax:
                                          </Text>
                                          <Text>
                                            $
                                            {(
                                              orderItems.reduce(
                                                (acc, item) => acc + item.Total,
                                                0
                                              ) * taxes
                                            ).toFixed(2)}
                                          </Text>
                                        </View>
                                        <View
                                          style={[layout.separate_horizontal]}
                                        >
                                          <Text style={[sizes.medium_text]}>
                                            Total:
                                          </Text>
                                          <Text style={[sizes.medium_text]}>
                                            $
                                            {(
                                              orderItems.reduce(
                                                (acc, item) => acc + item.Total,
                                                0
                                              ) *
                                                taxes +
                                              orderItems.reduce(
                                                (acc, item) => acc + item.Total,
                                                0
                                              )
                                            ).toFixed(2)}
                                          </Text>
                                        </View>
                                        {orderItems.some(
                                          (item) => item.AmountRefunded > 0
                                        ) && (
                                          <View
                                            style={[layout.separate_horizontal]}
                                          >
                                            <Text
                                              style={[
                                                sizes.small_text,
                                                { color: "orange" },
                                              ]}
                                            >
                                              New Total:
                                            </Text>
                                            <Text
                                              style={[
                                                sizes.small_text,
                                                { color: "orange" },
                                              ]}
                                            >
                                              $
                                              {(
                                                parseFloat(
                                                  (
                                                    orderItems.reduce(
                                                      (acc, item) =>
                                                        acc + item.Total,
                                                      0
                                                    ) * taxes
                                                  ).toFixed(2)
                                                ) +
                                                parseFloat(
                                                  orderItems
                                                    .reduce(
                                                      (acc, item) =>
                                                        acc + item.Total,
                                                      0
                                                    )
                                                    .toFixed(2)
                                                ) -
                                                parseFloat(
                                                  orderItems
                                                    .reduce(
                                                      (acc, item) =>
                                                        acc +
                                                        item.AmountRefunded,
                                                      0
                                                    )
                                                    .toFixed(2)
                                                )
                                              ).toFixed(2)}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={[sizes.medium_text, colors.white]}>
                    No orders placed
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <ButtonOne backgroundColor={"#117DFA"} styles={[layout.margin]} onPress={() => {
          function_GetDirections(coords.latitude, coords.longitude)
        }}>
          <Text style={[colors.white, format.center_text]}>Get Directions</Text>
        </ButtonOne>
      </View>
      <Modal visible={showModal} animationType="slide">
        <MenuBar
          navigation={navigation}
          route={route}
          bus={bus}
          setToggle={setShowModal}
        />
      </Modal>
    </SafeArea>
  );
}
