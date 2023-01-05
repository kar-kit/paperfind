//GLobal imports
import "react-native-gesture-handler";
import * as React from "react";

//Package Imports
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import DrawerNavBar from "./src/components/DrawerNavBar";

//Ignore package bug error
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Linking requires a build-time setting `scheme` in the project's Expo config (app.config.js or app.json) for production apps, if it's left blank, your app may crash. The scheme does not apply to development in the Expo client but you should add it as soon as you start working with Linking to avoid creating a broken build. Learn more: https://docs.expo.dev/guides/linking/",
  "Warning: Encountered two children with the same key",
  '[Unhandled promise rejection: FirebaseError: Invalid document reference. Document references must have an even number of segments, but users has 1.]',

])

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
