import { useEffect, useState } from "react";
import {
  AsyncImage,
  ButtonOne,
  Icon,
  IconButtonOne,
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  Spacer,
  SplitView,
  TextAreaOne,
  backgrounds,
  colors,
  firebase_CreateDocument,
  firebase_DeleteDocument,
  firebase_GetAllDocumentsListener,
  firebase_GetDocument,
  format,
  height,
  layout,
  me,
  randomString,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";

export function StartItemDetail({ navigation, route }) {
  const { item } = route.params;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState([]);
  const [details, setDetails] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  function onSelect(opt) {
    const selectedId = opt.id;
    const isIdSelected = selected.some((it) => it.id === selectedId);

    // Create a copy of the selected array
    const updatedSelected = [...selected];

    // Check if there's already an item with the same Category
    const existingCategoryIndex = updatedSelected.findIndex(
      (it) => it.Category === opt.Category
    );

    if (existingCategoryIndex !== -1) {
      if (isIdSelected) {
        // If the exact same item is already selected, remove it
        updatedSelected.splice(existingCategoryIndex, 1);
        console.log(
          `Item with id '${selectedId}' removed from the selected array.`
        );
      } else {
        // If an item with the same Category exists, replace it with the new item
        updatedSelected[existingCategoryIndex] = opt;
        console.log(
          `Item with Category '${opt.Category}' replaced in the selected array.`
        );
      }
    } else if (isIdSelected) {
      // If the exact same item is already selected, remove it
      const indexToRemove = updatedSelected.findIndex(
        (it) => it.id === selectedId
      );
      if (indexToRemove !== -1) {
        updatedSelected.splice(indexToRemove, 1);
        console.log(
          `Item with id '${selectedId}' removed from the selected array.`
        );
      }
    } else {
      // If the exact same item is not selected, add the new item
      updatedSelected.push(opt);
      console.log(`Item with id '${selectedId}' added to the selected array.`);
    }

    // Update the selected state with the modified array
    setSelected(updatedSelected);

    // Calculate the total based on the entire updated selected array
    const totalAmount =
      updatedSelected.reduce((acc, it) => {
        const itemAmount = parseFloat(it.Amount) || 0;
        const quantity = it.Quantity || 1;
        return acc + itemAmount * quantity;
      }, 0) +
      item.Price * qty;

    // Update the total state
    setTotal(totalAmount);
  }
  function onSelectCounter(direction, opt) {
    // Create a copy of the selected array
    const updatedSelected = [...selected];

    // Find the index of the selected option in the array
    const selectedIndex = updatedSelected.findIndex(
      (item) => item.id === opt.id
    );

    if (selectedIndex !== -1) {
      // Increase or decrease the Quantity based on the direction
      if (direction === "increase" && opt.Quantity < 6) {
        updatedSelected[selectedIndex].Quantity =
          (updatedSelected[selectedIndex].Quantity || 0) + 1;
      } else if (direction === "decrease" && opt.Quantity > 1) {
        updatedSelected[selectedIndex].Quantity = Math.max(
          1,
          (updatedSelected[selectedIndex].Quantity || 0) - 1
        );
      }

      // Update the selected state with the modified array
      setSelected(updatedSelected);

      // Calculate the total based on the entire updated selected array, considering item quantity (qty)
      const totalAmount =
        updatedSelected.reduce((acc, item) => {
          const itemAmount = parseFloat(item.Amount) || 0;
          const quantity = item.Quantity || 1;
          return acc + itemAmount * quantity * qty;
        }, 0) +
        item.Price * qty;

      // Update the total state
      setTotal(totalAmount);
    }
  }
  function onTypeDetails(text) {
    setDetails(text);
  }
  function onChangeQuantity(direction) {
    const MAX_QTY = 100; // Replace with your desired maximum quantity

    if (
      (direction === "increase" && qty < MAX_QTY) ||
      (direction === "decrease" && qty > 1)
    ) {
      console.log(direction.toUpperCase());

      const updatedQty = direction === "increase" ? qty + 1 : qty - 1;
      const basePrice = item.Price;

      // Calculate the total based on the entire updated selected array
      let tempTotal = basePrice;

      for (let i = 0; i < options.length; i += 1) {
        const option = options[i];
        if (
          selected.some((selectedObj) => selectedObj.Option === option.Option)
        ) {
          tempTotal += parseFloat(option.Amount) * option.Quantity;
        }
      }

      const updatedTotal = tempTotal * updatedQty;

      setQty(updatedQty);
      setTotal(updatedTotal);
    }
  }

  useEffect(() => {
    setLoading(true);
    firebase_GetAllDocumentsListener(
      setLoading,
      "ItemOptions",
      setOptions,
      0,
      "asc",
      "Order",
      "ItemID",
      "==",
      item.id
    );
    setLoading(true);
  }, []);

  return (
    <SafeArea
      loading={loading}
      styles={[{ backgroundColor: "#000000" }]}
      statusBar={"light"}
    >
      <View style={[{ flex: 1 }]}>
        <View style={[layout.separate_horizontal]}>
          <View
            style={[
              layout.horizontal,
              layout.padding,
              { alignItems: "center" },
            ]}
          >
            <IconButtonTwo
              name="arrow-back-outline"
              size={30}
              color="white"
              onPress={() => {
                navigation.navigate("start-menu");
              }}
            />
            <View
              style={[{ flexDirection: "row", flexWrap: "wrap", width: "70%" }]}
            >
              <Text style={[colors.white, sizes.medium_text, format.bold]}>
                {item.Name}
              </Text>
            </View>
          </View>
        </View>

        <RoundedCorners
          topLeft={20}
          topRight={20}
          //   styles={[{ backgroundColor: "#1A1A1A" }]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <RoundedCorners
                topLeft={20}
                topRight={20}
                styles={[{ backgroundColor: "#F2F3F7", paddingBottom: 50 }]}
              >
                <View style={[layout.padding]}>
                  <AsyncImage
                    path={item.ImagePath}
                    width={"100%"}
                    height={
                      item.ImageMode === "Portrait"
                        ? height * 0.45
                        : height * 0.3
                    }
                    radius={6}
                  />
                </View>
                <View
                  style={[
                    layout.padding,
                    { backgroundColor: "rgba(0,0,0,0.05)" },
                  ]}
                >
                  <Text style={[sizes.medium_text, format.bold]}>
                    Description
                  </Text>
                  <Text>{item.Desc}</Text>
                </View>
                <View style={[layout.padding]}>
                  <View>
                    {[...new Set(options.map((option) => option.Category))].map(
                      (cat, i) => {
                        return (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              if (selectedCategories.includes(cat)) {
                                const newArr = selectedCategories.filter(
                                  (c) => c !== cat
                                );
                                setSelectedCategories(newArr);
                              } else {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  cat,
                                ]);
                              }
                            }}
                            style={[layout.padding_vertical]}
                          >
                            <View style={[layout.separate_horizontal]}>
                              <Text style={[sizes.medium_text, format.bold]}>
                                {cat}
                              </Text>
                              <Icon
                                name={
                                  selectedCategories.includes(cat)
                                    ? "chevron-up-outline"
                                    : `chevron-down-outline`
                                }
                                size={30}
                              />
                            </View>
                            {selectedCategories.includes(cat) && (
                              <View style={[layout.margin_vertical_small]}>
                                {options
                                  .filter((opt) => opt.Category === cat)
                                  .map((opt, j) => {
                                    return (
                                      <TouchableOpacity
                                        style={[
                                          {
                                            backgroundColor: selected.some(
                                              (item) => item.id === opt.id
                                            )
                                              ? "#28D782"
                                              : "rgba(0,0,0,0.1)",
                                            paddingVertical: 12,
                                            paddingHorizontal: 12,
                                            borderRadius: 0,
                                          },
                                        ]}
                                        key={j}
                                        onPress={() => {
                                          onSelect(opt);
                                        }}
                                      >
                                        <View
                                          style={[layout.separate_horizontal]}
                                        >
                                          <Text
                                            style={[
                                              sizes.small_text,
                                              colors.black,
                                            ]}
                                          >
                                            {opt.Option}
                                          </Text>
                                          {opt.ShowAmount && (
                                            <Text
                                              style={[
                                                format.bold,
                                                sizes.small_text,
                                                colors.black,
                                              ]}
                                            >
                                              {opt.Amount < 0 ? "-" : "+"}$
                                              {Math.abs(opt.Amount).toFixed(2)}
                                            </Text>
                                          )}
                                          {opt.ShowCounter &&
                                            selected.some(
                                              (it) => it.id === opt.id
                                            ) && (
                                              <View
                                                style={[
                                                  layout.horizontal,
                                                  { alignItems: "center" },
                                                ]}
                                              >
                                                <IconButtonOne
                                                  name={"remove-outline"}
                                                  size={20}
                                                  padding={4}
                                                  onPress={() => {
                                                    onSelectCounter(
                                                      "decrease",
                                                      opt
                                                    );
                                                  }}
                                                />
                                                <Text>
                                                  {
                                                    selected.find(
                                                      (option) =>
                                                        option.id === opt.id
                                                    ).Quantity
                                                  }
                                                </Text>

                                                <IconButtonOne
                                                  name={"add-outline"}
                                                  size={20}
                                                  padding={4}
                                                  onPress={() => {
                                                    onSelectCounter(
                                                      "increase",
                                                      opt
                                                    );
                                                  }}
                                                />
                                              </View>
                                            )}
                                        </View>
                                      </TouchableOpacity>
                                    );
                                  })}
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      }
                    )}
                  </View>
                </View>
                <View
                  style={[
                    layout.padding_horizontal,
                    layout.padding_vertical_small,
                  ]}
                >
                  <Text style={[sizes.medium_text, format.bold]}>
                    Additional Details
                  </Text>
                  <View style={[{ marginVertical: 6 }]}>
                    <TextAreaOne
                      placeholder={"Type any additional details..."}
                      onTyping={onTypeDetails}
                      value={details}
                    />
                  </View>
                </View>
                {/* QUANTITY STUFF */}
                <View
                  style={[
                    {
                      borderBottomColor: "rgba(0,0,0,0.3)",
                      borderBottomWidth: 2,
                    },
                  ]}
                ></View>
                <Spacer height={20} />
                <View
                  style={[
                    layout.separate_horizontal,
                    layout.padding_horizontal,
                  ]}
                >
                  <Text style={[format.bold, sizes.medium_text]}>Total: </Text>
                  <Text style={[format.bold, sizes.medium_text]}>
                    ${total.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={[
                    layout.horizontal,
                    layout.padding,
                    { alignItems: "center" },
                  ]}
                >
                  <View style={[layout.horizontal, { alignItems: "center" }]}>
                    <IconButtonOne
                      name={"remove-outline"}
                      size={20}
                      padding={8}
                      onPress={() => {
                        onChangeQuantity("decrease");
                      }}
                    />
                    <Text style={[sizes.medium_text]}>{qty}</Text>
                    <IconButtonOne
                      name={"add-outline"}
                      size={20}
                      padding={8}
                      onPress={() => {
                        onChangeQuantity("increase");
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ButtonOne
                      styles={[
                        layout.separate_horizontal,
                        layout.padding_horizontal,
                      ]}
                      radius={20}
                      onPress={() => {
                        navigation.navigate("login");
                      }}
                      width={"auto"}
                    >
                      <Text style={[colors.white, { fontSize: 16 }]}>
                        Add To Cart
                      </Text>
                      <Icon name="cart" size={22} color="white" />
                    </ButtonOne>
                  </View>
                </View>

                {/* BOTTOM STUFF */}
              </RoundedCorners>
            </View>
          </ScrollView>
        </RoundedCorners>
      </View>
    </SafeArea>
  );
}
