import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import BookmarkPage from "../pages/BookmarkPage";
import { useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Bookmark: undefined; // Tipe untuk bookmarkedImages
};

const Stack = createStackNavigator<RootStackParamList>();

const AppRouter = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          title: "Login Page",
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: "Home Page",
        }}
      />
      <Stack.Screen
        name="Bookmark"
        component={BookmarkPage}
        options={{ title: "Bookmark Page" }}
      />
    </Stack.Navigator>
  );
};

export default AppRouter;
