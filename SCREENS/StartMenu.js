import { useEffect, useState } from "react";
import {
  AsyncImage,
  Icon,
  IconButtonOne,
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  Spacer,
  SplitView,
  bus,
  colors,
  coords,
  firebase_GetAllDocumentsListener,
  firebase_GetDocument,
  firebase_UpdateToken,
  format,
  function_GetDirections,
  function_NotificationsSetup,
  layout,
  me,
  myToken,
  sizes,
  width,
} from "../EVERYTHING/BAGEL/Things";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MenuBar } from "../EVERYTHING/MenuBar";

export function Order({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "Items",
      setItems,
      0,
      "asc",
      "Category",
      "",
      "",
      ""
    );
    firebase_GetDocument(setLoading, "Settings", "settings", setSettings);
    if (myToken !== "") {
      firebase_UpdateToken(myToken)
    }
  }, [myToken]);

  return (
    <SafeArea
      loading={loading}
      statusBar={"light"}
      styles={[{ backgroundColor: "#000000" }]}
    >
      <View style={[layout.padding, layout.separate_horizontal]}>
        <Text style={[colors.white, sizes.medium_text]}>Order Menu</Text>
        <View style={[layout.horizontal]}>
          <IconButtonTwo
            name="heart"
            size={30}
            color={"white"}
            onPress={() => {
              navigation.navigate("favorites", bus);
            }}
          />
          <IconButtonTwo
            name="car"
            size={30}
            color={"white"}
            onPress={() => {
              function_GetDirections(coords.latitude, coords.longitude);
            }}
          />
          <IconButtonTwo
            name="cart"
            size={30}
            color={"white"}
            onPress={() => {
              navigation.navigate("cart", bus);
            }}
          />
          <IconButtonTwo
            name="menu-outline"
            size={30}
            color={"white"}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
      </View>
      <RoundedCorners
        topLeft={20}
        topRight={20}
        styles={[{ flex: 1, backgroundColor: "#1A1A1A" }]}
      >
        {/* MENU */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* FEATURED */}
            <View style={[layout.separate_horizontal]}>
              <View
                style={[
                  {
                    backgroundColor: "rgba(255,255,255, 0.2)",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    alignSelf: "flex-start",
                    alignItems: "center",
                  },
                  layout.margin,
                  format.radius_full,
                  layout.horizontal,
                ]}
              >
                {/* <Icon name={"star-outline"} size={16} color="white" /> */}
                <Text
                  style={[
                    colors.white,
                    { fontSize: 16 },
                    format.all_caps,
                    format.bold,
                  ]}
                >
                  {settings.Headline}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("profile", bus);
                }}
              >
                <View
                  style={[
                    {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      alignSelf: "flex-start",
                      alignItems: "center",
                    },
                    layout.margin,
                    format.radius_full,
                  ]}
                >
                  <Text style={[{ color: "#117DFA" }]}>
                    Points: {me.Points}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={[layout.padding_horizontal, layout.horizontal]}>
                {items
                  .filter((thing) => thing.Featured && !thing.Out)
                  .map((item, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          navigation.navigate("item-detail", { bus, item, savedOptions: [], savedDetails: "" });
                        }}
                        style={[
                          {
                            width:
                              item.ImageMode === "Portrait"
                                ? width * 0.5
                                : width * 0.8,
                          },
                        ]}
                      >
                        <AsyncImage
                          path={item.ImagePath}
                          width={
                            item.ImageMode === "Portrait"
                              ? width * 0.5
                              : width * 0.8
                          }
                          height={width * 0.6}
                        />
                        <View style={[layout.padding_vertical_small]}>
                          <View
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                            }}
                          >
                            <Text
                              style={[
                                { fontSize: 18 },
                                format.bold,
                                colors.white,
                              ]}
                            >
                              {item.Name}
                            </Text>
                          </View>

                          {/* <View
                            style={[
                              layout.horizontal,
                              { alignItems: "center" },
                            ]}
                          >
                            <Text style={[{ fontSize: 16 }, colors.white]}>
                              ${item.Price.toFixed(2)}
                            </Text>
                          </View> */}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
            <Spacer height={6} />
            <View>
              <RoundedCorners
                topLeft={20}
                topRight={20}
                styles={[{ backgroundColor: "white" }]}
              >
                <View
                  style={[
                    layout.padding,
                    layout.horizontal,
                    { alignItems: "center" },
                  ]}
                >
                  <Icon name="cafe-outline" size={24} />
                  <Text
                    style={[format.bold, sizes.medium_text, format.all_caps]}
                  >
                    Menu
                  </Text>
                </View>
                <View>
                  {[...new Set(items.map((item) => item.Category))].map(
                    (category, index) => (
                      <View
                        key={index}
                        style={[
                          {
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(0,0,0,0.2)",
                          },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (chosenCategory === category) {
                              setChosenCategory("");
                            } else {
                              setChosenCategory(category);
                            }
                          }}
                          style={[layout.separate_horizontal, layout.padding]}
                        >
                          <Text style={[sizes.large_text]}>{category}</Text>
                          <Icon
                            name={
                              category === chosenCategory
                                ? "chevron-up-outline"
                                : "chevron-down-outline"
                            }
                            size={30}
                          />
                        </TouchableOpacity>
                        {chosenCategory === category && (
                          <View>
                            {items
                              .filter(
                                (it) => it.Category === category && !it.Out
                              )
                              .map((thing, j) => {
                                return (
                                  <TouchableOpacity
                                    key={j}
                                    style={[
                                      layout.padding,
                                      layout.horizontal,
                                      {
                                        borderBottomWidth: 1,
                                        borderBottomColor: "rgba(0,0,0,0.3)",
                                        width: "100%"
                                      },
                                    
                                    ]}
                                    onPress={() => {
                                      navigation.navigate("item-detail", {
                                        bus,
                                        item: thing,
                                        savedOptions: [],
                                        savedDetails: ""
                                      });
                                    }}
                                  >
                                    <AsyncImage
                                      path={thing.ImagePath}
                                      height={75}
                                      width={75}
                                    />
                                    <View style={[{flexDirection: "row", flexWrap: "wrap", width: "75%"}]}>
                                      <Text style={[sizes.medium_text]}>
                                        {thing.Name}
                                      </Text>
                                      {/* <Text>${thing.Price.toFixed(2)}</Text> */}
                                    </View>
                                  </TouchableOpacity>
                                );
                              })}
                          </View>
                        )}
                      </View>
                    )
                  )}
                </View>
              </RoundedCorners>
            </View>
          </View>
        </ScrollView>
      </RoundedCorners>
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
