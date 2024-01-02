import { useEffect, useState } from "react";
import {
  ButtonOne,
  Icon,
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  Spacer,
  auth_DeleteUser,
  bus,
  colors,
  firebase_DeleteDocument,
  firebase_GetDocument,
  firebase_GetMe,
  format,
  layout,
  me,
  sizes,
  width,
} from "../EVERYTHING/BAGEL/Things";
import { Alert, Modal, Text, View } from "react-native";
import { MenuBar } from "../EVERYTHING/MenuBar";

export function Profile({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    firebase_GetMe(me.id);
    firebase_GetDocument(setLoading, "Settings", "settings", setSettings);
  }, [me]);

  return (
    <SafeArea
      loading={loading}
      statusBar={"light"}
      styles={[{ backgroundColor: "#000000" }]}
    >
      <View style={[{ flex: 1 }]}>
        <View style={[layout.padding, layout.separate_horizontal]}>
          <Text style={[colors.white, sizes.medium_text]}>My Profile</Text>
          <IconButtonTwo
            name="menu-outline"
            size={30}
            color={"white"}
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        {/* PROFILE STUFF */}
        <View style={[layout.separate_vertical]}>
          <View>
            <Text
              style={[
                colors.blue,
                { fontSize: width * 0.3 },
                format.center_text,
              ]}
            >
              {me.Points}
            </Text>
            <Text style={[format.center_text, colors.white, sizes.small_text]}>
              Max: {settings.PointsCap}
            </Text>
            <View
              style={[
                layout.horizontal,
                layout.center_horizontal,
                layout.padding,
                { alignItems: "center" },
              ]}
            >
              <Text
                style={[sizes.medium_text, format.center_text, colors.white]}
              >
                Points
              </Text>
              <Icon name="star" size={20} color={"white"} />
            </View>
            <View
              style={[
                layout.center_horizontal,
                { backgroundColor: "white", width: width * 0.4, height: 10 },
              ]}
            ></View>
          </View>
          {/* OPTIONS */}
          <View style={[{ backgroundColor: "#1A1A1A" }]}>
            <View>
              <ButtonOne
                backgroundColor={"rgba(0,0,0,0)"}
                padding={18}
                onPress={() => {
                  navigation.navigate("favorites", { bus });
                }}
              >
                <View style={[layout.horizontal]}>
                  <Icon name="heart-outline" size={30} color={"white"} />
                  <Text style={[sizes.large_text, colors.white]}>
                    Favorites
                  </Text>
                </View>
              </ButtonOne>
              <ButtonOne
                backgroundColor={"rgba(0,0,0,0)"}
                padding={18}
                onPress={() => {
                  navigation.navigate("rewards", bus);
                }}
              >
                <View style={[layout.horizontal]}>
                  <Icon name="star-outline" size={30} color={"white"} />
                  <Text style={[sizes.large_text, colors.white]}>Rewards</Text>
                </View>
              </ButtonOne>
            </View>
            <View>
              <ButtonOne
                backgroundColor={"rgba(0,0,0,0)"}
                padding={18}
                onPress={() => {
                  Alert.alert(
                    "Delete Account",
                    "Are you sure you want to delete this account?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete Account",
                        style: "destructive",
                        onPress: () => {
                          auth_DeleteUser().then(() => {
                            firebase_DeleteDocument(
                              setLoading,
                              "Users",
                              me.id
                            ).then(() => {
                              navigation.navigate("login");
                              Alert.alert("Account Deleted");
                            });
                          });
                        },
                      },
                    ]
                  );
                }}
              >
                <View style={[layout.horizontal]}>
                  <Icon name="person-remove-outline" size={30} color={"red"} />
                  <Text style={[sizes.large_text, { color: "red" }]}>
                    Delete Account
                  </Text>
                </View>
              </ButtonOne>
            </View>
          </View>
        </View>
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
