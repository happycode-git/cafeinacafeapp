import { useEffect, useState } from "react";
import {
  ButtonOne,
  RoundedCorners,
  SafeArea,
  Spacer,
  SplitView,
  TextFieldOne,
  auth_CreateUser,
  auth_IsUserSignedIn,
  backgrounds,
  colors,
  format,
  layout,
  sizes,
  bus
} from "../EVERYTHING/BAGEL/Things";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { ScrollView } from "react-native";

export function Signup({ navigation, route }) {
  const { bus } = route.params;
  const [loading, setLoading] = useState(false);
  //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  //
  function onTypeFirstName(text) {
    setFirstName(text);
  }
  function onTypeLastName(text) {
    setLastName(text);
  }
  function onTypeEmail(text) {
    setEmail(text);
  }
  function onTypePhone(text) {
    setPhone(text);
  }
  function onTypePass(text) {
    setPassword(text);
  }
  function onTypePassConf(text) {
    setPasswordConf(text);
  }
  function onSignUp() {
    setLoading(true);
    const args = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      Points: 0
    };
    auth_CreateUser(
      setLoading,
      email,
      password,
      args,
      navigation,
      { bus },
      "order"
    );
  }

  useEffect(() => {
    // setLoading(true);
    // auth_IsUserSignedIn(
    //   setLoading,
    //   navigation,
    //   "order",
    //   "signup",
    //   bus
    // );
  }, [])
  

  return (
    <SafeArea
      loading={loading}
      styles={[{ backgroundColor: "#000000" }]}
      statusBar={"light"}
    >
      <View style={[layout.padding, { flex: 1 }]}>
        <View>
          <Text
            style={[colors.white, sizes.large_text, layout.padding_vertical]}
          >
            Sign Up
          </Text>
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
              styles={[{ backgroundColor: "#F2F3F7", flex: 1 }]}
            >
              <View style={[layout.padding, layout.vertical]}>
                <SplitView leftSize={1} rightSize={1}>
                  <TextFieldOne
                    placeholder={"First Name"}
                    onTyping={onTypeFirstName}
                  />
                  <TextFieldOne
                    placeholder={"Last Name"}
                    onTyping={onTypeLastName}
                  />
                </SplitView>
                <TextFieldOne placeholder={"Email"} onTyping={onTypeEmail} />
                <TextFieldOne placeholder={"Phone"} onTyping={onTypePhone} />
                <View>
                  <TextFieldOne
                    placeholder={"Password"}
                    isPassword={true}
                    onTyping={onTypePass}
                    value={password}
                  />
                  {password.length > 0 && password.length < 8 && (
                    <Text style={[{ color: "orange" }]}>
                      Password must be 8+ chars.
                    </Text>
                  )}
                </View>
                <View>
                  <TextFieldOne
                    placeholder={"Confirm Password"}
                    isPassword={true}
                    onTyping={onTypePassConf}
                    value={passwordConf}
                  />
                  {password !== "" &&
                    password !== passwordConf &&
                    passwordConf !== "" && (
                      <Text style={[{ color: "red" }]}>
                        Passwords do not match.
                      </Text>
                    )}
                </View>
              </View>
            </RoundedCorners>
          </ScrollView>
        </KeyboardAvoidingView>
        <Spacer height={4} />
        {firstName !== "" &&
          lastName !== "" &&
          email !== "" &&
          phone !== "" &&
          password !== "" &&
          password.length >= 8 &&
          password === passwordConf && (
            <ButtonOne
              radius={12}
              backgroundColor={"#117DFA"}
              onPress={onSignUp}
            >
              <Text style={[colors.white, format.center_text]}>Sign Up</Text>
            </ButtonOne>
          )}
      </View>
    </SafeArea>
  );
}
