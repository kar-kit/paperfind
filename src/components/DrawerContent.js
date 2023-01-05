//Global imports
import "react-native-gesture-handler";
import * as React from "react";

//Package imports
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";


function CustomDrawerContent(props) {

  //Package initilisation
  const navigation = useNavigation();
  const auth = getAuth();

  //Sign out function in sidebar
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Landing");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      </View>

      <View style={styles.textimagecontainer}>
        <Image source={require('../assets/images/pf-logo-text.png')} style={styles.textimage}/>
      </View>

      <DrawerContentScrollView {...props} style={{ marginTop: -25 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  textimagecontainer: {
    paddingTop: 50,
    paddingLeft: 15,
  },
  textimage: {
    resizeMode: "stretch",
    height: 100,
    width: 200,
  },
  texticon: {
    marginLeft: 5,
    marginTop: 27,
    height: 45,
    width: 45,
  },
  button: {
    backgroundColor: "#FF5B5B",
    width: "90%",
    height: 51,
    padding: 15,
    borderRadius: 6,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
