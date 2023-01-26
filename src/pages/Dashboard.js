//Package Imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";

//User Imports
import { auth } from "../../config";

//Page Function
function Dashboard({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    getUserInfo();
    getWelcomeMessage();
  }, []);

  //Navigation Functions
  const onSearch = () => {
    navigation.navigate("Search");
  };

  const onFilterSaved = () => {
    navigation.navigate("Saved");
  };

  const onFilterChem = () => {
    navigation.navigate("Chemistry");
  };

  const onFilterBio = () => {
    navigation.navigate("Biology");
  };

  const onFilterPhys = () => {
    navigation.navigate("Physics");
  };

  const getUserInfo = () => {
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      setDisplayName(displayName);
      console.log("User info retrieved 🪪");
    }
  };

  const getWelcomeMessage = () => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setWelcomeMessage("Good Morning");
    } else if (curHr < 18) {
      setWelcomeMessage("Good Afternoon");
    } else {
      setWelcomeMessage("Good Evening");
    }

    console.log("Greeting message created ⌚");
  };

  return (
    <View style={styles.containerPage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {welcomeMessage} {displayName}
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonSearch} onPress={onSearch}>
          <Text style={styles.buttonText}>Search Papers</Text>
          <Image
            style={styles.searchImage}
            source={require("../assets/images/search.png")}
          />
        </TouchableOpacity>

        <View style={styles.filterContainer1}>
          <TouchableOpacity style={styles.filterBox1} onPress={onFilterSaved}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/savedFB.png")}
            />
            <Text style={styles.filterButtonText}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBox2} onPress={onFilterBio}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/filterBio.png")}
            />
            <Text style={styles.filterButtonText}>Biology</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer2}>
          <TouchableOpacity style={styles.filterBox3} onPress={onFilterChem}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/filterChem.png")}
            />
            <Text style={styles.filterButtonText}>Chemistry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBox4} onPress={onFilterPhys}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/filterPhy.png")}
            />
            <Text style={styles.filterButtonText}>Physics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    marginTop: 20,
  },
  container: {
    marginTop: 20,
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  profileIcon: {
    marginTop: -10,
    marginRight: 10,
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
    justifyContent: "flex-start",
  },
  searchImage: {
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  buttonSearch: {
    backgroundColor: "white",
    width: "90%",
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
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "white",
    width: "90%",
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
  filterContainer1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  filterContainer2: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'flex-start',
    marginTop: -150,
  },
  filterBoxImage: {
    width: 110,
    height: 110,
  },
  filterButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  filterBox1: {
    backgroundColor: "#FFEB81",
    alignItems: "center",
    width: "45%",
    height: "55%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
  filterBox2: {
    backgroundColor: "#B3FF8F",
    alignItems: "center",
    width: "45%",
    height: "55%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
  filterBox3: {
    backgroundColor: "#FF7171",
    alignItems: "center",
    width: "45%",
    height: "55%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
  filterBox4: {
    backgroundColor: "#75E6FF",
    alignItems: "center",
    width: "45%",
    height: "55%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
});
