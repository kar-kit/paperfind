//Package Imports
import { signOut } from "firebase/auth";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";




import React, { useEffect, useState } from "react";


//Page Function
const Test = () => {

  const [num, setNum] = useState(0)

  useEffect(() => {
    console.log('Number has been changed')
  }, [num]);

  function addOne() {
    newNum = num + 1
    setNum(newNum)
  }


  return (
    <View style={styles.pageBorder}>
      <Text>The button has been pressed {num} times</Text>
      <Button onPress={addOne} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  pageBorder: {
    flex: 1,
    marginTop: 35,
  },
  imageArrow: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginTop: 40,
    marginLeft: 10,
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
