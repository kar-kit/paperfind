//Global imports
import * as React from "react";
import "react-native-gesture-handler";

//Package imports
import { createDrawerNavigator } from "@react-navigation/drawer";
import Anticons from "react-native-vector-icons/AntDesign";

//User Imports
import CustomDrawerContent from "./DrawerContent";
import LandingPage from "../pages/logsys/LandingPage";
import LoginPage from "../pages/logsys/LoginPage";
import RegisterPage from "../pages/logsys/RegisterPage";
import Dashboard from '../pages/Dashboard';
import Profile from "../pages/Profile";

import Search from '../pages/Search';

import FilterSaved from '../pages/filterpages/FilterSaved';
import ChemSaved from '../pages/filterpages/ChemSaved';
import BioSaved from '../pages/filterpages/BioSaved';
import PhysSaved from '../pages/filterpages/PhySaved';



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
        name="Search"
        component={Search}
        drawerContent={(props) => <TodoScreen {...props} extraData={user} />}
        options={{
          drawerActiveBackgroundColor: "#BEE8FF",
          drawerActiveTintColor: "#FFF",
          headerShown: false,

          drawerIcon: (color) => (
            <Anticons name="search1" size={22} color={color} />
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
      <Drawer.Screen
        name="Chemistry"
        component={ChemSaved}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Biology"
        component={BioSaved}
        options={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Physics"
        component={PhysSaved}
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
