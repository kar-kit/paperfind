import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../../../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigation = useNavigation();

  const onFooterLinkPress = () => {
    navigation.navigate("Register");
  };
  const onBackArrowPress = () => {
    navigation.navigate("Landing");
  };

  const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSignedIn(true);
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.containerPage}>
      <TouchableOpacity onPress={onBackArrowPress}>
        <Image
          source={require("../../assets/images/back-arrrow.png")}
          style={styles.imageArrow}
        />
      </TouchableOpacity>

      <KeyboardAvoidingView style={styles.container} behavior="padding ">
        <View style={styles.imagecontainer}>
          <Image
            source={require("../../assets/images/pf-logo-text.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            autoCapitalize="none"
          ></TextInput>

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onLoginPress} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onFooterLinkPress}
            style={[styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPage: {
    flex: 1,
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
