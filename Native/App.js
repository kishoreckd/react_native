// import { StatusBar, Switch } from 'react-native';
// import React from 'react';
// import { Text, View } from 'react-native';
// import {useColorScheme} from 'nativewind'

// export default function App() {
//   const {colorScheme, toggleColorScheme}= useColorScheme();
//   return (
//  <View className="flex-1 items-center justify-center bg-gray-200 dark:bg-black dark:text-white">
//       <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />
//       <Text className="dark:text-white">Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import Product from "./screens/product";
import LoginPage from "./screens/Login";
import ProductDescription from "./screens/productdescription";
import ProfilePage from "./screens/profilepage";
import CartPage from "./screens/CartPage";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: background, // Set default background color to red
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  const [cart, setCart] = useState([]);

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerShown: true,
          headerLeft: () => {
            if (route.name === 'Product') {
              return <ProfileButton navigation={navigation} />;
            } else {
              if (route.name !== 'Login') {
                return <BackButton navigation={navigation} />;
              }
            }
          },
          headerRight: () => {
            const cartItemCount = cart ? cart.length : 0;

            if (route.name === 'Product') {
              return (
                <CartButton navigation={navigation} cartItemCount={cartItemCount}/>
              );
              } 
          },
        })}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginPage} /> 
        <Stack.Screen name="Product">
          {(props) => <Product {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="ProductDescription" component={ProductDescription} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Cart">{(props) => <CartPage {...props} cart={cart} setCart={setCart} />}</Stack.Screen>
       </Stack.Navigator>
    </NavigationContainer>
  );
};

const ProfileButton = ({ navigation }) => {
  return (
    <TouchableOpacity className="ml-5" onPress={() => navigation.navigate('ProfilePage')}>
      <MaterialIcons name="account-circle" size={24} color="black" />
    </TouchableOpacity>
  );
};

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity className="ml-5" onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

const CartButton = ({ navigation, cartItemCount }) => {
  return (
    <TouchableOpacity className="mr-5 relative" onPress={() => navigation.navigate('Cart')}>
      <MaterialIcons name="shopping-cart" size={24} color="black" />
      {cartItemCount > 0 && <Text className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">{cartItemCount}</Text>}
    </TouchableOpacity>
  );
};

export default App;
