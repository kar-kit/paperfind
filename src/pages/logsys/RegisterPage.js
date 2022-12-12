//Package Imports
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

//User imports
import { auth } from "../../../config";

//Page Function
const RegisterPage = ({ navigation }) => {
  //UseState Varibles for subfunctions and return data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Navigation Functions
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onBackArrowPress = () => {
    navigation.navigate("Landing");
  };


  //Signup Function
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      //Same password check
      alert("Passwords don't match.");
      return;
    }
    //Writing user data to firebase
    createUserWithEmailAndPassword(auth, email, password, fullName)
      .then((userCredential) => {
        //After new user created navigate to the dashboard
        const user = userCredential.user;
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        //Show any errors in the terminal
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
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={styles.input}
            autoCapitalize="none"
          ></TextInput>

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
            secureTextEntry
            autoCapitalize="none"
          ></TextInput>

          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onRegisterPress} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onFooterLinkPress}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Already a User?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagecontainer: {
    marginTop: -70,
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
    paddingVertical: 10,
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
