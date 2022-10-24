import "react-native-gesture-handler";
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Anticons from "react-native-vector-icons/AntDesign";
import Maticons from "react-native-vector-icons/MaterialCommunityIcons";

import LandingPage from "../pages/logsys/LandingPage";
import LoginPage from "../pages/logsys/LoginPage";
import RegisterPage from "../pages/logsys/RegisterPage";
import Dashboard from '../pages/Dashboard';
import Profile from "../pages/Profile";

import FilterSaved from '../pages/filterpages/FilterSaved';

import CustomDrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

function DrawerNavBar() {
  return (
    <Drawer.Navigator
      initialRouteName="Landing"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: {
          color: "#565656",
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Landing"
        component={LandingPage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerActiveBackgroundColor: "#FFE9BE",
          drawerActiveTintColor: "#FFF",
          headerShown: false,

          drawerIcon: (color) => (
            <Anticons name="user" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        drawerContent={(props) => <TodoScreen {...props} extraData={user} />}
        options={{
          drawerActiveBackgroundColor: "#BEE8FF",
          drawerActiveTintColor: "#FFF",
          headerShown: false,

          drawerIcon: (color) => (
            <Anticons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved"
        component={FilterSaved}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavBar;
