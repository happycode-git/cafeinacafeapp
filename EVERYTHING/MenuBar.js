import { Alert, Image, ScrollView, Text, View } from "react-native";
import {
  AsyncImage,
  ButtonOne,
  Icon,
  IconButtonOne,
  LinkOne,
  SafeArea,
  Spacer,
  auth_SignOut,
  colors,
  format,
  layout,
  sizes,
} from "./BAGEL/Things";
import { useState } from "react";

export function MenuBar({ navigation, route, bus, setToggle }) {
  const [loading, setLoading] = useState(false);
  return (
    <SafeArea styles={[{ backgroundColor: "white" }]}>
      <View style={[layout.padding, { flex: 1 }]}>
        <View>
          <View style={[layout.center_horizontal, { width: 75, height: 75 }]}>
            <Image
              source={require("../assets/logo.png")}
              style={[{ width: 70, height: 70 }]}
            />
          </View>
          <Spacer height={5} />
          <Text style={[sizes.large_text, format.center_text, format.bold]}>
            {bus.Name}
          </Text>
        </View>
        <Spacer height={16} />
        <View style={[layout.separate_vertical]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[layout.padding_vertical, layout.vertical]}>
              <ButtonOne
                backgroundColor={"white"}
                padding={5}
                onPress={() => {
                  setToggle(false);
                  navigation.navigate("order", { bus });
                }}
              >
                <View style={[layout.horizontal, { alignItems: "center" }]}>
                  <Icon name={"cafe-outline"} size={25} />
                  <Text style={[sizes.medium_text]}>Order</Text>
                </View>
              </ButtonOne>
              <ButtonOne
                backgroundColor={"white"}
                padding={5}
                onPress={() => {
                  setToggle(false);
                  navigation.navigate("cart", { bus });
                }}
              >
                <View style={[layout.horizontal, { alignItems: "center" }]}>
                  <Icon name={"cart-outline"} size={25} />
                  <Text style={[sizes.medium_text]}>Cart</Text>
                </View>
              </ButtonOne>
              <ButtonOne
                backgroundColor={"white"}
                padding={5}
                onPress={() => {
                  setToggle(false);
                  navigation.navigate("my-orders", { bus });
                }}
              >
                <View style={[layout.horizontal, { alignItems: "center" }]}>
                  <Icon name={"document-text-outline"} size={25} />
                  <Text style={[sizes.medium_text]}>My Orders</Text>
                </View>
              </ButtonOne>
              <ButtonOne
                backgroundColor={"white"}
                padding={5}
                onPress={() => {
                  setToggle(false);
                  navigation.navigate("blog", { bus });
                }}
              >
                <View style={[layout.horizontal, { alignItems: "center" }]}>
                  <Icon name={"newspaper-outline"} size={25} />
                  <Text style={[sizes.medium_text]}>Blog</Text>
                </View>
              </ButtonOne>
              <ButtonOne
                backgroundColor={"white"}
                padding={5}
                onPress={() => {
                  setToggle(false);
                  navigation.navigate("profile", { bus });
                }}
              >
                <View style={[layout.horizontal, { alignItems: "center" }]}>
                  <Icon name={"person-circle-outline"} size={25} />
                  <Text style={[sizes.medium_text]}>Profile</Text>
                </View>
              </ButtonOne>
              <ButtonOne
                backgroundColor={"white"}
                padding={5}
                onPress={() => {
                  setToggle(false);
                  navigation.navigate("info", { bus });
                }}
              >
                <View style={[layout.horizontal, { alignItems: "center" }]}>
                  <Icon name={"information-circle-outline"} size={25} />
                  <Text style={[sizes.medium_text]}>Hours & Locations</Text>
                </View>
              </ButtonOne>
            </View>
          </ScrollView>
          {/*  */}
          <View style={[layout.separate_horizontal]}>
            <LinkOne
              underlineColor={"rgba(0,0,0,0)"}
              onPress={() => {
                Alert.alert("Sign Out", "Are you sure you want to sign out?", [
                  { text: "Cancel" },
                  {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: () => {
                      setLoading(true)
                      setToggle(false)
                      auth_SignOut(
                        setLoading,
                        navigation,
                        { bus },
                        "login"
                      );
                    },
                  },
                ]);
              }}
            >
              <View style={[layout.horizontal, { alignItems: "center" }]}>
                <Icon name="return-up-back-outline" color={"red"} size={30} />
                <Text style={[{ color: "red", fontSize: 20 }]}>Sign Out</Text>
              </View>
            </LinkOne>
            <ButtonOne
              padding={4}
              radius={100}
              backgroundColor={"rgba(0,0,0,0.1)"}
              styles={[{ paddingVertical: 4, paddingHorizontal: 18 }]}
              onPress={() => {
                setToggle(false);
              }}
            >
              <View
                style={[layout.separate_horizontal, layout.center_horizontal]}
              >
                <Icon color={"black"} name="close-outline" size={28} />
                <Text style={[colors.black]}>Close</Text>
              </View>
            </ButtonOne>
          </View>
        </View>
      </View>
    </SafeArea>
  );
}
