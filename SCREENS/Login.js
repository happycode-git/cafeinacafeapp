import { useEffect, useState } from "react";
import {
  AsyncImage,
  ButtonOne,
  Icon,
  LinkOne,
  RoundedCorners,
  SafeArea,
  TextFieldOne,
  auth_IsUserSignedIn,
  auth_ResetPassword,
  auth_SignIn,
  bus,
  colors,
  format,
  height,
  layout,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";

export function Login({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  function onTypeEmail(text) {
    setEmail(text);
  }
  function onTypePass(text) {
    setPassword(text);
  }
  function onLogIn() {
    setLoading(true);
    auth_SignIn(setLoading, email, password, navigation, bus, "order");
  }

  useEffect(() => {
    setLoading(true);
    auth_IsUserSignedIn(
      setLoading,
      navigation,
      "order",
      "login",
      bus
    );
  }, []);

  return (
    <SafeArea
      loading={loading}
      styles={[{ backgroundColor: "#000000" }]}
      statusBar={"light"}
    >
      <View style={[layout.padding, { flex: 1 }]}>
        <View
          style={[
            layout.padding,
            layout.separate_horizontal,
            { alignItems: "center" },
          ]}
        >
          <Text style={[sizes.large_text, colors.white]}>Login</Text>
          <ButtonOne
            padding={2}
            radius={100}
            backgroundColor={"#1A1A1A"}
            onPress={() => {
              navigation.navigate("signup", bus);
            }}
          >
            <View
              style={[
                { paddingVertical: 4, paddingHorizontal: 12, gap: 5 },
                layout.separate_horizontal,
              ]}
            >
              <Text style={[colors.white, { fontSize: 16 }]}>Sign Up</Text>
              <Icon name={"arrow-forward-outline"} color={"white"} size={16} />
            </View>
          </ButtonOne>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <RoundedCorners
              topLeft={20}
              topRight={20}
              bottomLeft={20}
              bottomRight={20}
              styles={[{ backgroundColor: "white", flex: 1 }]}
            >
              <View style={[layout.padding, layout.separate_vertical]}>
                <View
                  style={[
                    layout.fit_width,
                    layout.center_horizontal,
                    { height: height * 0.2, width: height * 0.2 },
                  ]}
                >
                  <Image
                    source={require("../assets/logo.png")}
                    style={[{width: height * 0.2, height: height * 0.2}]}
                  />
                </View>
                <View style={[{ gap: 4 }]}>
                  <TextFieldOne placeholder={"Email"} onTyping={onTypeEmail} />
                  <TextFieldOne
                    placeholder={"Password"}
                    isPassword={true}
                    onTyping={onTypePass}
                  />
                  <ButtonOne backgroundColor={"#1BA8FF"} onPress={onLogIn}>
                    <Text style={[colors.white, format.center_text]}>
                      Login
                    </Text>
                  </ButtonOne>
                </View>
              </View>
            </RoundedCorners>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={[{ paddingVertical: 8 }, layout.center_horizontal]}>
          <LinkOne
            underlineColor={"white"}
            onPress={() => {
              if (email !== "") {
                auth_ResetPassword(email);
              } else {
                Alert.alert(
                  "Missing Email",
                  "Please provide a valid email to send reset password link."
                );
              }
            }}
          >
            <Text style={[colors.white]}>Forgot your password?</Text>
          </LinkOne>
        </View>
      </View>
    </SafeArea>
  );
}
