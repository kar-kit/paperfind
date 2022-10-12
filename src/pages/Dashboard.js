import React, { Component } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";

function Dashboard({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Logged in !!</Text>
      <Text>Email: {email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
