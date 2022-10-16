import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { async } from "@firebase/util";
import { SearchBar } from "react-native-screens";

function Settings() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  // React.useEffect(() => {
  //   const { authentication: { accessToken } } = response;
  // }, []);

  // async function fetchUserInfo(token) {
  //   const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //   });

  //   return await response.json();
  // }

  // async function getData () {
  //   const user = await fetchUserInfo(accessToken);
  //   console.log(user)
  // }

  return (
    <View style={styles.containerPage}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Good Morning User 1</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <Image source={require("../assets/images/profile-icon.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonSearch}>
          <Text style={styles.buttonText}>Search Papers</Text>
          <Image
            style={styles.searchImage}
            source={require("../assets/images/search.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Last Opened</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    marginTop: 30,
  },
  container: {
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  header: {
    flexDirection: "row",
  },
  profileIcon: {
    marginLeft: 40,
    marginTop: -10,
  },
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 25,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
    flexDirection: "row",
  },
  searchImage: {
    marginLeft: 150,
    width: 30,
    height: 30,
  },
  buttonSearch: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
  },

  imagecontainer: {
    marginTop: -150,
  },
  image: {
    height: 205,
    width: 290,
    resizeMode: "contain",
  },
  imageArrow: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginTop: 40,
    marginLeft: 10,
  },
  arrowContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonOutline: {
    marginTop: 10,
    backgroundColor: "#3A4252",
    width: "100%",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
