import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./Test";
import { useEffect } from "react";
import { function_NotificationsSetup } from "./EVERYTHING/BAGEL/Things";
import { Login } from "./SCREENS/Login";
import { Signup } from "./SCREENS/Signup";
import { Order } from "./SCREENS/Order";
import { Cart } from "./SCREENS/Cart";
import { Orders } from "./SCREENS/Orders";
import { Blog } from "./SCREENS/Blog";
import { Profile } from "./SCREENS/Profile";
import { Favorites } from "./SCREENS/Favorites";
import { Rewards } from "./SCREENS/Rewards";
import { ItemDetail } from "./SCREENS/ItemDetail";
import { CartReview } from "./SCREENS/CartReview";
import { Info } from "./SCREENS/Info";
import { StartMenu } from "./SCREENS/StartMenu";
import { StartItemDetail } from "./SCREENS/StartItemDetail";
import { StartBlog } from "./SCREENS/StartBlog";
import { StartInfo } from "./SCREENS/StartInfo";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {}, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="start-menu">
        <Stack.Screen
          name="start-menu"
          component={StartMenu}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="start-item-detail"
          component={StartItemDetail}
          options={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="start-blog"
          component={StartBlog}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="start-info"
          component={StartInfo}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="order"
          component={Order}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="cart"
          component={Cart}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="info"
          component={Info}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="my-orders"
          component={Orders}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="blog"
          component={Blog}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="favorites"
          component={Favorites}
          options={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="rewards"
          component={Rewards}
          options={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="item-detail"
          component={ItemDetail}
          options={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="cart-review"
          component={CartReview}
          options={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="test"
          component={Test}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
