//Global imports
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

//Package imports
import React, { useState, useEffect } from "react";
import { ResponseType } from "expo-auth-session";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

//Page Function
const LandingPage = ({ navigation }) => {
  //UseState Varibles for subfunctions and return data
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState();

  //Google Api Connection
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "675263949593-075ghuufj3iuu2n3omi8jdaaia4m9c35.apps.googleusercontent.com",
  });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setIsSignedIn(true);
          navigation.navigate("Dashboard");
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [response]);

  //Navigation Funtion
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding ">
      <View style={styles.imagecontainer}>
        <Image
          source={require("../../assets/images/pf-logo-text.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          style={styles.button}
        >
          <Image
            source={require("../../assets/images/google-login.png")}
            style={styles.imageGoogle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onFooterLinkPress}
          style={[styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign in With Email</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagecontainer: {
    marginTop: -15,
  },
  image: {
    height: 205,
    width: 290,
    resizeMode: "contain",
  },
  imageGoogle: {
    width: 160,
    resizeMode: "contain",
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
    marginTop: 100,
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    marginTop: 10,
    backgroundColor: "#3A4252",
    width: "100%",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
