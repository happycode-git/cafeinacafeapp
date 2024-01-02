import { useEffect, useState } from "react";
import {
  Icon,
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  bus,
  colors,
  firebase_GetAllDocumentsListener,
  format,
  layout,
  me,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import { ScrollView, Text, View } from "react-native";

export function Rewards({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "Rewards",
      setRewards,
      0,
      "asc",
      "Points",
      "",
      "",
      ""
    );
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "Redeemed",
      setHistory,
      0,
      "asc",
      "Date",
      "UserID",
      "==",
      me.id
    );
  }, []);

  return (
    <SafeArea
      loading={loading}
      statusBar={"light"}
      styles={[{ backgroundColor: "#000000" }]}
    >
      <View style={[{ flex: 1 }]}>
        <View
          style={[layout.padding, layout.horizontal, { alignItems: "center" }]}
        >
          <IconButtonTwo
            name="arrow-back-outline"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("profile", bus);
            }}
          />
          <Text style={[colors.white, sizes.medium_text]}>Rewards</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <RoundedCorners
              topLeft={15}
              topRight={15}
              styles={[{ backgroundColor: "#F2F3F7" }]}
            >
              <View style={[layout.padding, layout.vertical]}>
                {rewards.map((reward, i) => {
                  return (
                    <View>
                      <View
                        style={[layout.horizontal, { alignItems: "center" }]}
                      >
                        <Icon name="star-outline" size={25} />
                        <Text style={[sizes.large_text]}>
                          {reward.Points} Points
                        </Text>
                      </View>
                      <View
                        style={[layout.horizontal, { alignItems: "center" }]}
                      >
                        <Text>One free item from</Text>
                        <Text style={[format.bold]}>{reward.Category}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </RoundedCorners>
          </View>
          <View
            style={[
              layout.margin_vertical,
              { backgroundColor: "#1A1A1A" },
              layout.padding,
            ]}
          >
            <Text style={[sizes.medium_text, colors.white]}>
              Redeem History
            </Text>
            <View>
              {history.map((thing, i) => {
                return (
                  <View
                    key={i}
                    style={[layout.padding, layout.separate_horizontal]}
                  >
                    <Text style={[colors.white]}>{thing.Points} Points</Text>
                    <Text style={[colors.white]}>
                      {new Date(thing.Date.seconds * 1000).toLocaleDateString("en-US")}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}
