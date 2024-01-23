import { useState } from "react";
import {
  ButtonOne,
  Icon,
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  Spacer,
  bus,
  colors,
  coords,
  format,
  function_CallPhoneNumber,
  function_GetDirections,
  layout,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import { MenuBar } from "../EVERYTHING/MenuBar";
import { Modal, Text, View } from "react-native";

export function StartInfo({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
              navigation.navigate("start-menu");
            }}
          />
          <Text style={[colors.white, sizes.medium_text]}>
            Hours & Location
          </Text>
        </View>

        <Spacer height={15} />

        <RoundedCorners
          topLeft={15}
          topRight={15}
          styles={[{ backgroundColor: "#F2F3F7" }]}
        >
          <View style={[layout.padding]}>
            <Text style={[sizes.large_text]}>Address:</Text>
            <Text style={[sizes.small_text]}>4011 46th St</Text>
            <Text style={[sizes.small_text]}>San Diego, CA 92105, USA</Text>
            <Spacer height={15} />
            <ButtonOne
              styles={[layout.separate_horizontal]}
              onPress={() => {
                function_GetDirections(coords.latitude, coords.longitude);
              }}
              backgroundColor={"#1BA8FF"}
              radius={15}
            >
              <Text style={[colors.white, sizes.medium_text]}>
                Get Directions
              </Text>
              <Icon name={"car"} size={28} color="white" />
            </ButtonOne>
          </View>

          <View style={[layout.padding]}>
            <Text style={[sizes.large_text]}>Hours:</Text>
            <Text style={[sizes.small_text]}>Monday: 7:00 AM - 5:00 PM</Text>
            <Text style={[sizes.small_text]}>Tuesday: 7:00 AM - 5:00 PM</Text>
            <Text style={[sizes.small_text]}>Wednesday: 7:00 AM - 5:00 PM</Text>
            <Text style={[sizes.small_text]}>Thursday: 7:00 AM - 5:00 PM</Text>
            <Text style={[sizes.small_text]}>Friday: 7:00 AM - 5:00 PM</Text>
            <Text style={[sizes.small_text]}>Saturday: 7:00 AM - 5:00 PM</Text>
            <Text style={[sizes.small_text, format.bold]}>
              Sunday: 7:00 AM - 4:00 PM
            </Text>
            <Spacer height={15} />
            <ButtonOne
              styles={[layout.separate_horizontal]}
              onPress={() => {
                function_CallPhoneNumber("7602080335");
              }}
              backgroundColor={"#1BA8FF"}
              radius={15}
            >
              <Text style={[colors.white, sizes.medium_text]}>
                Call Cafeina Cafe
              </Text>
              <Icon name={"call"} size={28} color="white" />
            </ButtonOne>
          </View>
        </RoundedCorners>

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
