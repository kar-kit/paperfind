import "react-native-gesture-handler";
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Anticons from "react-native-vector-icons/AntDesign";
import Maticons from "react-native-vector-icons/MaterialCommunityIcons";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import Todos from "../pages/Todolist";
import Calendarpage from "../pages/Calendar";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

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
        component={Todos}
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
        name="Calendar"
        component={Calendarpage}
        options={{
          headerShown: false,
          drawerActiveBackgroundColor: "#E3C8FF",
          drawerActiveTintColor: "#FFF",
          drawerIcon: (color) => (
            <Anticons name="calendar" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavBar;
