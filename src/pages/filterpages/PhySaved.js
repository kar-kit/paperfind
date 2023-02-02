//Global Imports
import * as OpenAnything from "react-native-openanything";

//Package imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { getDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { db, auth } from "../../../config";

//Page Function
function PhysSaved({ navigation }) {
  //UseState Variables for subfunctions and return data
  const [itemList, setItemList] = useState([]);
  const [userID, setUserID] = useState("");

  //Code ran on initial startup
  useEffect(() => {
    setItemList("");
    console.log("Items reset 🚮");
    getUserID();
    console.log("User ID retrieved 💳");
  }, []);

  //Code ran on page navigation
  useFocusEffect(
    React.useCallback(() => {
      setItemList("");
      console.log("Items reset 🚮");
      retriveData();
      console.log("Papers retrieved successfully ✅");
    }, [userID])
  );

  //retrive userID
  const getUserID = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
        console.log("User info retrieved 🪪");
      } else {
        console.log("error cannot find user id");
      }
    });
  };

  async function retriveData() {
    //create doc ref with user ID to retrive fav papers
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    //run query using doc ref
    if (docSnap.exists()) {
      const userData = docSnap.data().favorites;
      userData.forEach(async (paperID) => {
        //query each fav paper ID and retrive paper data
        const paperRef = doc(db, "papers", paperID);
        const paperSnap = await getDoc(paperRef);

        if (paperSnap.exists()) {
          const paper = paperSnap.data();
          if (paper.subject == "physics") {
            setItemList((arr) => [
              ...arr,
              {
                title: paper.displayname,
                link: paper.downloadurl,
                examboard: paper.examboard,
                subject: paper.subject,
                id: doc.id,
              },
            ]);
          }
        }
      });
      console.log("Papers loaded 📰");
    } else {
      // if no fav paper for category
      console.log("No favorited Physics Papers ❌");
      alert(
        "No documents have been saved, Please go to the search section to find papers"
      );
    }
  }

  async function favoriteItem(idCred) {
    //getting user data
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const itemRef = doc(db, "users", uid);
        const docSnap = await getDoc(itemRef);

        //getting user fav array from user data
        if (docSnap.exists()) {
          if (docSnap.data().favorites.includes(idCred) === false) {
            //if paper not in fav then add paperid to fav array
            await updateDoc(itemRef, {
              favorites: arrayUnion(idCred),
            });
            retriveData();
            console.log("Added Successfully 😊");
          }
        } else {
          //make new fav array with paperid
          const docData = {
            favorites: [idCred],
          };
          //make new doc with fav array under user collection
          await setDoc(doc(db, "users", uid), docData);
          console.log("New user favorite added 🫡");
          retriveData();
        }
      } else {
        console.log("error cannot find user id");
      }
    });
  }

  //Navigation function
  const onBackArrowPress = () => {
    navigation.navigate("Dashboard");
  };

  //Blueprint for search result frontend
  const Item = ({ title, link, examboard, subject, idCred }) => (
    <TouchableOpacity
      style={styles.buttonItem}
      onPress={() => OpenAnything.Pdf(link)}
    >
      <View style={styles.buttonHeader}>
        <Text style={styles.buttonText}>{title}</Text>

        <TouchableOpacity onPress={() => favoriteItem(idCred)}>
          <Image
            style={styles.searchImage}
            source={require("../../assets/images/fill-saved-icon.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.buttonText2}>
          {subject} {examboard}
        </Text>
      </View>
    </TouchableOpacity>
  );

  //search result frontend blueprints inputs
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      link={item.link}
      subject={item.subject}
      examboard={item.examboard}
      idCred={item.id}
    />
  );

  return (
    <View style={styles.containerPage}>
      <TouchableOpacity onPress={onBackArrowPress}>
        <Image
          source={require("../../assets/images/back-arrrow.png")}
          style={styles.imageArrow}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.headerBorderContainer}>
          <Text style={styles.headerText}>Saved Physics Papers</Text>
        </View>

        <SafeAreaView>
          <FlatList data={itemList} renderItem={renderItem} />
        </SafeAreaView>
      </View>
    </View>
  );
}

export default PhysSaved;

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    marginTop: 20,
  },
  buttonItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 330,
  },
  buttonHeader: {
    flexDirection: "row",
    marginBottom: -10,
  },
  container: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 30,
    padding: 20,
  },
  headerBorderContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    borderWidth: 4,
    borderColor: "#75E6FF",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonText2: {
    color: "black",
    fontWeight: "300",
    fontSize: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  searchImage: {
    width: 30,
    height: 30,
    marginLeft: 150,
    alignItems: "flex-end",
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
});
