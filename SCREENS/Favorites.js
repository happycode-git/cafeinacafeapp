import { useEffect, useState } from "react";
import {
  AsyncImage,
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  colors,
  firebase_GetAllDocumentsListener,
  firebase_GetDocument,
  layout,
  sizes,
  bus,
  me
} from "../EVERYTHING/BAGEL/Things";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export function Favorites({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  const [item, setItem] = useState({});

  async function onItemPress(itemID, savedOptions, savedDetails) {
    setLoading(true);
    try {
      const tempItem = await new Promise((resolve) => {
        firebase_GetDocument(setLoading, "Items", itemID, (item) => {
          resolve(item);
          navigation.navigate("item-detail", {item, savedOptions, bus, savedDetails})
        });
      });
      console.log(tempItem);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "Saved",
      setSaved,
      0,
      "asc",
      "Name",
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
          <Text style={[colors.white, sizes.medium_text]}>
            My Favorite Items
          </Text>
        </View>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RoundedCorners
              topLeft={15}
              topRight={15}
              styles={[{ backgroundColor: "#F2F3F7" }, layout.padding]}
            >
              {saved.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: "rgba(0,0,0,0.2)",
                      },
                      layout.padding_vertical,
                      layout.horizontal,
                    ]}
                    onPress={() => {
                      onItemPress(item.ItemID, item.Options, item.Details);
                    }}
                  >
                    <View style={[{ width: 80, height: 80 }]}>
                      <AsyncImage
                        path={item.ImagePath}
                        width={80}
                        height={80}
                      />
                    </View>
                    <View style={[{flexDirection: "row", flexWrap: "wrap", width: "70%"}]}>
                    <Text style={[sizes.small_text]}>{item.Name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </RoundedCorners>
          </ScrollView>
        </View>
      </View>
    </SafeArea>
  );
}
