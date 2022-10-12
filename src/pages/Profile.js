import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Image,
} from "react-native";

const Profile = ({ navigation }) => {
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
    <View style={styles.pageBorder}>
      <TouchableOpacity
        style={styles.hamMenu}
        onPress={() => navigation.openDrawer()}
      >
        <Image source={require("../assets/images/ham-menu.png")} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile Tab</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity onPress={alert(email)}>
              <Text style={styles.buttonText}>View Email</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Notifications</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.buttonTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  pageBorder: {
    flex: 1,
    marginTop: 35,
  },
  hamMenu: {
    marginLeft: 20,
  },
  container: {
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 60,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "#BEE8FF",
    borderRadius: 18,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontFamily: "Inter-SemiBold",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    padding: 20,
  },
  buttonContainer: {
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 40,
  },
  buttonTextLogout: {
    fontFamily: "Inter-SemiBold",
    fontSize: 40,
    color: "#ec7878",
  },
  listContainer: {
    marginTop: 20,
    marginLeft: 10,
    padding: 20,
  },
  entityContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
    fontFamily: "Inter-Regular",
  },
  shiftContainer: {
    flexDirection: "row",
    height: 70,
    marginTop: 0,
    marginBottom: 20,
    flex: 1,
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  buttonShift: {
    padding: 10,
    flex: 1,
    height: 47,
    borderRadius: 5,
    backgroundColor: "#ec7878",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextShift: {
    fontFamily: "Inter-SemiBold",
    color: "white",
    fontSize: 16,
  },
});
