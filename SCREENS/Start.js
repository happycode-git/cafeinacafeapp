import { useState } from "react";
import { SafeArea } from "../EVERYTHING/BAGEL/Things";
import { View } from "react-native";
export function Start({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  return (
    <SafeArea loading={loading} statusBar={"light"}>
      <View style={[{ flex: 1 }]}></View>
    </SafeArea>
  );
}
