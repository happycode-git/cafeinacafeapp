import { useEffect, useState } from "react";
import {
  AsyncImage,
  ButtonOne,
  Icon,
  IconButtonTwo,
  LinkOne,
  RoundedCorners,
  SafeArea,
  appName,
  colors,
  firebase_CreateDocument,
  firebase_DeleteDocument,
  firebase_GetAllDocumentsListener,
  firebase_GetDocument,
  firebase_GetMe,
  firebase_UpdateDocument,
  format,
  layout,
  me,
  publishableKey,
  randomString,
  serverAPIURL,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  StripeProvider,
  presentPaymentSheet,
  usePaymentSheet,
} from "@stripe/stripe-react-native";

export function CartReview({ navigation, route }) {
  const { bus, total } = route.params;
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toggleRewards, setToggleRewards] = useState(false);
  const [rewards, setRewards] = useState([]);
  const taxes = 0.0875;
  const [settings, setSettings] = useState({});

  const [pi, setPi] = useState("");
  //
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  const [loading, setLoading] = useState(false);

  function onRedeem(points, cartItem) {
    setLoading(true);
    const newPoints = me.Points - points;
    const args = {
      Points: newPoints,
    };
    const args2 = {
      Points: points,
      Date: new Date(),
      UserID: me.id,
    };
    firebase_CreateDocument(args2, "Redeemed", randomString(25));
    firebase_UpdateDocument(setLoading, "Users", me.id, args).then(() => {
      setLoading(true);
      firebase_GetMe(me.id).then(() => {
        var newTot = cartItem.Total - cartItem.OrigPrice;
        if (newTot < 0) {
          newTot = 0;
        }
        firebase_UpdateDocument(setLoading, "CartItems", cartItem.id, {
          Total: newTot,
        });

        console.log("REDEEM");
      });
    });
  }
  const fetchPaymentSheetParams = async () => {
    const customerID = me.CustomerID;
    const response = await fetch(`${serverAPIURL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerID,
        total, // Pass existing CustomerID if available
      }),
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();
    setPi(`${paymentIntent.split("_")[0]}_${paymentIntent.split("_")[1]}`);

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: bus.Name,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      // applePay: {
      //   merchantCountryCode: "usd",
      // },
      // googlePay: {
      //   merchantCountryCode: "usd",
      //   testEnv: true,
      //   currencyCode: "usd",
      // },
    });
    if (!error) {
      if (me.CustomerID === undefined) {
        console.log(ephemeralKey);
        firebase_UpdateDocument(setLoadingTwo, "Users", me.id, {
          CustomerID: customer,
        });
      }
      setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      onCreateOrder();
    }
  };

  function onCreateOrder() {
    setLoading(true);
    setLoadingTwo(true);
    const tempArr = [...cartItems];
    const orderID = randomString(25);
    var capped = false;
    // GIVE POINTS PER DOLLAR
    const rewardPoints = Math.ceil((total / 100) * settings.PointsPer);
    if (settings.PointsCap !== 0) {
      if (me.Points + rewardPoints >= settings.PointsCap) {
        capped = true;
      }
    } 
    console.log(capped)
    console.log(rewardPoints)
    firebase_UpdateDocument(setLoadingTwo, "Users", me.id, {
      Points: capped ? settings.PointsCap : me.Points + rewardPoints,
    });
    firebase_CreateDocument(
      {
        Date: new Date(),
        Status: "Preparing",
        Name: `${me.FirstName} ${me.LastName}`,
        UserID: me.id,
        PaymentIntent: pi,
        Opened: false,
      },
      "Orders",
      orderID
    ).then(() => {
      for (var i = 0; i < tempArr.length; i += 1) {
        const item = tempArr[i];
        const args = {
          ImagePath: item.ImagePath,
          Total: item.Total,
          Options: item.Options,
          Details: item.Details,
          Quantity: item.Quantity,
          OrderID: orderID,
          Name: item.Name,
          AmountRefunded: 0,
        };
        firebase_CreateDocument(args, "OrderItems", randomString(25));
        setLoadingTwo(true);
        firebase_DeleteDocument(setLoadingTwo, "CartItems", item.id);
        if (i === cartItems.length - 1) {
          setLoadingTwo(false);
          Alert.alert(
            "Success",
            "Thank you for submitting your order. We will begin preparing and let you know when the order is ready.",
            [
              {
                text: "Okay",
                onPress: () => {
                  navigation.navigate("my-orders", { bus });
                },
              },
            ]
          );
        }
      }
    });
  }

  useEffect(() => {
    setLoadingTwo(true);
    initializePaymentSheet();
    firebase_GetDocument(setLoading, "Settings", "settings", setSettings);
    firebase_GetAllDocumentsListener(
      setLoadingTwo,
      "CartItems",
      setCartItems,
      0,
      "asc",
      "UserID",
      "UserID",
      "==",
      me.id
    );
    firebase_GetAllDocumentsListener(
      setLoadingTwo,
      "Rewards",
      setRewards,
      0,
      "asc",
      "Points",
      "",
      "",
      ""
    );
    firebase_GetMe(me.id);
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={`iicdev.com.${appName}`}
    >
      <SafeArea
        loading={loadingTwo}
        styles={[{ backgroundColor: "#000000" }]}
        statusBar={"light"}
      >
        <View style={[{ flex: 1 }]}>
          <View
            style={[
              layout.padding,
              layout.horizontal,
              { alignItems: "center" },
            ]}
          >
            <IconButtonTwo
              name="arrow-back-outline"
              size={30}
              color="white"
              onPress={() => {
                navigation.navigate("cart", { bus });
              }}
            />
            <Text style={[colors.white, sizes.medium_text]}>
              Review your cart before payment.
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[{ backgroundColor: "#1A1A1A" }, layout.padding_vertical]}
            >
              <View>
                <Text
                  style={[
                    format.right_text,
                    layout.padding_horizontal,
                    { color: "#1BA8FF" },
                  ]}
                >
                  Points: {me.Points}
                </Text>
              </View>
              {cartItems.map((item, i) => {
                return (
                  <View
                    style={[
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: "rgba(255,255,255,0.2)",
                      },
                      layout.padding,
                    ]}
                    key={i}
                  >
                    <View style={[layout.horizontal]}>
                      <AsyncImage
                        path={item.ImagePath}
                        height={70}
                        width={70}
                      />
                      <View style={[{ flex: 1 }]}>
                        <View
                          style={[
                            layout.separate_horizontal,
                            { alignItems: "center" },
                          ]}
                        >
                          <Text style={[sizes.small_text, colors.white]}>
                            {item.Name}
                          </Text>
                          
                        </View>
                        <Text style={[sizes.small_text, colors.white]}>
                            {item.Quantity} x
                          </Text>
                        <Text
                          style={[colors.white, layout.padding_vertical_small]}
                        >
                          Total: ${item.Total.toFixed(2)}
                        </Text>
                        {item.Options !== "" && (
                          <View
                            style={[
                              {
                                paddingHorizontal: 6,
                                marginLeft: 6,
                                borderLeftWidth: 2,
                                borderLeftColor: "#28D782",
                              },
                            ]}
                          >
                            <Text style={[colors.white]}>
                              {item.Options.replaceAll("jjj", "\n")}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    {item.Details !== "" && (
                      <View style={[layout.padding_vertical_small]}>
                        <Text style={[colors.white, layout.padding]}>
                          {item.Details.replaceAll("jjj", "\n")}
                        </Text>
                      </View>
                    )}
                    {rewards.filter((rew) => rew.Category === item.Category)
                      .length > 0 &&
                      item.Total >= item.OrigPrice &&
                      rewards
                        .filter((rew) => rew.Category === item.Category)
                        .sort((a, b) => a.Points - b.Points)[0].Points <=
                        me.Points && (
                        <LinkOne
                          underlineColor={"white"}
                          onPress={() => {
                            Alert.alert(
                              "Are you sure?",
                              `This action will deduct ${
                                rewards
                                  .filter(
                                    (rew) => rew.Category === item.Category
                                  )
                                  .sort((a, b) => a.Points - b.Points)[0].Points
                              } points. This reward does not include any extras.`,
                              [
                                { text: "Cancel" },
                                {
                                  text: "Redeem",
                                  style: "destructive",
                                  onPress: () => {
                                    const points = rewards
                                      .filter(
                                        (rew) => rew.Category === item.Category
                                      )
                                      .sort(
                                        (a, b) => a.Points - b.Points
                                      )[0].Points;
                                    onRedeem(points, item);
                                  },
                                },
                              ]
                            );
                          }}
                          styles={[layout.padding_vertical_small]}
                        >
                          <Text style={[colors.white]}>Redeem Free Item</Text>
                        </LinkOne>
                      )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {/* TOTALS */}
          <View style={[layout.padding]}>
            <View style={[layout.separate_horizontal]}>
              <Text style={[colors.white, sizes.small_text]}>Sub Total:</Text>
              <Text style={[colors.white, sizes.small_text]}>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.Total, 0)
                  .toFixed(2)}
              </Text>
            </View>
            <View style={[layout.separate_horizontal]}>
              <Text style={[colors.white, sizes.small_text]}>Taxes:</Text>
              <Text style={[colors.white, sizes.small_text]}>
                $
                {(
                  cartItems.reduce((acc, item) => acc + item.Total, 0) * taxes
                ).toFixed(2)}
              </Text>
            </View>
            <View style={[layout.separate_horizontal]}>
              <Text style={[colors.white, sizes.medium_text]}>Total:</Text>
              <Text style={[colors.white, sizes.medium_text]}>
                $
                {(
                  cartItems.reduce((acc, item) => acc + item.Total, 0) * taxes +
                  cartItems.reduce((acc, item) => acc + item.Total, 0)
                ).toFixed(2)}
              </Text>
            </View>
          </View>
          {/* BUTTONS */}
          <View>
            {loading ? (
              <ButtonOne
                backgroundColor={"#117DFA"}
                radius={0}
                onPress={openPaymentSheet}
              >
                <View style={[layout.separate_horizontal]}>
                  <Text style={[colors.white, sizes.small_text]}>
                    Create Order
                  </Text>
                  <Icon
                    name={"arrow-forward-outline"}
                    size={20}
                    color={"white"}
                  />
                </View>
              </ButtonOne>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      </SafeArea>
    </StripeProvider>
  );
}
