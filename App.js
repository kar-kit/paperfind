//GLobal imports
import "react-native-gesture-handler";
import * as React from "react";

//Package Imports
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import DrawerNavBar from "./src/components/DrawerNavBar";

//Ignore package bug error
LogBox.ignoreAllLogs()

//Load custom fonts from assets
export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.otf"),
    "Inter-Black": require("./src/assets/fonts/Inter-Black.otf"),
  });

  //Provide app navigation interface
  return (
    <NavigationContainer>
      <DrawerNavBar />
    </NavigationContainer>
  );
}
