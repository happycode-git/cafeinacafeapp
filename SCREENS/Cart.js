import { useEffect, useState } from "react";
import {
  AsyncImage,
  ButtonOne,
  IconButtonTwo,
  LinkOne,
  RoundedCorners,
  SafeArea,
  backgrounds,
  bus,
  colors,
  firebase_DeleteDocument,
  firebase_GetAllDocumentsListener,
  format,
  layout,
  me,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import { Alert, Modal, ScrollView, Text, View } from "react-native";
import { MenuBar } from "../EVERYTHING/MenuBar";

export function Cart({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "CartItems",
      setCartItems,
      0,
      "asc",
      "UserID",
      "UserID",
      "==",
      me.id
    );
  }, []);

  return (
    <SafeArea
      loading={loading}
      styles={[{ backgroundColor: "#000000" }]}
      statusBar={"light"}
    >
      <View style={[{ flex: 1 }]}>
        <View style={[layout.padding, layout.separate_horizontal]}>
          <Text style={[colors.white, sizes.medium_text]}>
            My Cart ({cartItems.length})
          </Text>
          <IconButtonTwo
            name="menu-outline"
            size={30}
            color={"white"}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <RoundedCorners
            topLeft={15}
            topRight={15}
            bottomLeft={15}
            bottomRight={15}
            styles={[{ backgroundColor: "#F2F3F7" }]}
          >
            {cartItems.length > 0 ? (
              <View style={[layout.padding, layout.vertical]}>
                {cartItems.map((item, i) => {
                  return (
                    <View
                      style={[backgrounds.white, layout.padding, format.radius]}
                      key={i}
                    >
                      <View style={[layout.horizontal]}>
                        <View style={[{ width: 70, height: 70 }]}>
                          <AsyncImage
                            path={item.ImagePath}
                            width={70}
                            height={70}
                          />
                        </View>
                        <View style={[{ flex: 1 }]}>
                          <View
                            style={[
                              layout.horizontal,
                              { alignItems: "center" },
                            ]}
                          >
                            <Text style={[sizes.small_text]}>
                                {item.Name}
                              </Text>
                            <Text style={[sizes.small_text]}>
                              {item.Quantity} x
                            </Text>
                          </View>
                          <Text style={[layout.padding_vertical_small]}>
                            ${item.Total.toFixed(2)}
                          </Text>
                          {item.Options !== "" && (
                            <View
                              style={[
                                {
                                  paddingLeft: 6,
                                  borderLeftWidth: 2,
                                  borderLeftColor: "#28D782",
                                },
                              ]}
                            >
                              <Text>
                                {item.Options.replaceAll("jjj", "\n")}
                              </Text>
                            </View>
                          )}
                          <View style={[layout.separate_horizontal]}>
                            <View></View>
                            <View>
                              <LinkOne
                                underlineColor={"red"}
                                onPress={() => {
                                  Alert.alert(
                                    "Remove Item",
                                    "Are you sure you want to remove this item from your cart?",
                                    [
                                      {
                                        text: "Cancel",
                                      },
                                      {
                                        text: "Remove",
                                        style: "destructive",
                                        onPress: () => {
                                          setLoading(true);
                                          firebase_DeleteDocument(
                                            setLoading,
                                            "CartItems",
                                            item.id
                                          );
                                        },
                                      },
                                    ]
                                  );
                                }}
                              >
                                <Text style={[{ color: "red" }]}>Remove</Text>
                              </LinkOne>
                            </View>
                          </View>
                        </View>
                      </View>
                      {item.Details !== "" && (
                        <View
                          style={[
                            layout.margin_vertical,
                            layout.padding,
                            { backgroundColor: "rgba(0,0,0,0.05)" },
                            format.radius,
                          ]}
                        >
                          <Text>{item.Details.replaceAll("jjj", "\n")}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={[layout.padding]}>
                <Text style={[sizes.medium_text]}>No items in your cart.</Text>
              </View>
            )}
            {cartItems.length > 0 && (
              <View style={[layout.padding]}>
                <ButtonOne
                  radius={12}
                  onPress={() => {
                    const taxes = 0.0875;
                    const totalBeforeTax = cartItems.reduce(
                      (acc, item) => acc + item.Total,
                      0
                    );
                    const totalWithTaxes = (
                      totalBeforeTax * taxes +
                      totalBeforeTax
                    ).toFixed(2);
                    const total = (totalWithTaxes * 100).toFixed(0);
                    navigation.navigate("cart-review", { bus, total });
                  }}
                >
                  <Text
                    style={[format.center_text, sizes.small_text, colors.white]}
                  >
                    Proceed
                  </Text>
                </ButtonOne>
              </View>
            )}
          </RoundedCorners>
        </ScrollView>
        <Modal visible={showModal} animationType="slide">
          <MenuBar
            navigation={navigation}
            route={route}
            bus={bus}
            setToggle={setShowModal}
          />
        </Modal>
      </View>
    </SafeArea>
  );
}
