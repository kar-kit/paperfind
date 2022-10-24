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

function Dashboard({ navigation }) {
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

  const onProfile = () => {
    navigation.navigate("Profile");
  };

  const onFilterSaved = () => {
    navigation.navigate("Saved");
  };



  return (
    <View style={styles.containerPage}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Good Morning User 1</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={onProfile}>
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

        <View style={styles.filterContainer1}>
          <TouchableOpacity style={styles.filterBox1} onPress={onFilterSaved}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/savedFB.png")}
            />
            <Text style={styles.filterButtonText}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBox2}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/filterBio.png")}
            />
            <Text style={styles.filterButtonText}>Biology</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer2}>
          <TouchableOpacity style={styles.filterBox3}>
            <Image
              style={styles.filterBoxImage}
              source={require("../assets/images/filterChem.png")}
            />
            <Text style={styles.filterButtonText}>Chemistry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBox4}>
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
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  profileIcon: {
    marginTop: -10,
    marginRight: 10,
  },
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 25,
    marginRight: '18%',
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
    flexDirection: "row",
    justifyContent: 'flex-start'
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  filterContainer2: {
    flex: 1,
    flexDirection: 'row',
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
    justifyContent: 'flex-start'
  },
  filterBox1: {
    backgroundColor: '#FFEB81',
    alignItems: 'center',
    width: "45%",
    height: '55%',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
  filterBox2: {
    backgroundColor: '#B3FF8F',
    alignItems: 'center',
    width: "45%",
    height: '55%',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
  filterBox3: {
    backgroundColor: '#FF7171',
    alignItems: 'center',
    width: "45%",
    height: '55%',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },
  filterBox4: {
    backgroundColor: '#75E6FF',
    alignItems: 'center',
    width: "45%",
    height: '55%',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
  },

});
