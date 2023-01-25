//Global Imports
import * as OpenAnything from 'react-native-openanything'

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
import { useFocusEffect } from '@react-navigation/native';
import { db, auth } from '../../../config';


//Page Function
function PhysSaved({ navigation }) {
  //UseState Varibles for subfunctions and return data
  const [itemList, setItemList] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setItemList('')
    console.log('Items reset 🚮')
    getUserID()
    console.log('User ID retrieved 💳')
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setItemList('')
      console.log('Items reset 🚮')
      retriveData()
      console.log('Papers retrieved successfully ✅')
    }, [userID])
  );



  const getUserID = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid)
      } else {
        console.log('error cannot find user id')
      }
    });
  }


  async function retriveData() {
    const docRef = doc(db, "users", userID);
    // const docRef = doc(db, "users", 're3gVuQyj1PJeGmzkNzvKzSjCTs1');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().favorites
      userData.forEach(async (paperID) => {
        const paperRef = doc(db, 'papers', paperID)
        const paperSnap = await getDoc(paperRef)

        if (paperSnap.exists()) {
          const paper = paperSnap.data()
          if (paper.subject == 'physics') {
            setItemList(arr => [...arr, {
              'title': paper.displayname,
              'link': paper.downloadurl,
              'examboard': paper.examboard,
              'subject': paper.subject,
              'id': doc.id
            }]);
          }

        }
      })
      console.log('Papers loaded 📰')
    } else {
      // doc.data() will be undefined in this case
      console.log("No favorited Biology Papers ❌");
      alert('No documents have been saved, Please go to the search section to find papers')
    }
  }


  async function favoriteItem(idCred) {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const itemRef = doc(db, 'users', uid)
        const docSnap = await getDoc(itemRef)

        if (docSnap.exists()) {
          console.log(idCred, 'Removed Successfully 💀')
          await updateDoc(itemRef, {
            favorites: arrayRemove(idCred)
          })
          setItemList('')
          retriveData()
        } else {
          alert('No documents have been saved')
        }

      } else {
        console.log('error cannot find user id')
      }
    });


  }

  //Navigation function
  const onBackArrowPress = () => {
    navigation.navigate("Dashboard");
  };

  const Item = ({ title, link, examboard, subject, idCred }) => (
    <TouchableOpacity style={styles.buttonItem} onPress={() => OpenAnything.Pdf(link)}>
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
        <Text style={styles.buttonText2}>{subject} {examboard}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} link={item.link} subject={item.subject} examboard={item.examboard} idCred={item.id} />
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
          <FlatList
            data={itemList}
            renderItem={renderItem}
          />
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
    alignItems: 'center',
  },
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 30,
    padding: 20,
  },
  headerBorderContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: '90%',
    borderWidth: 4,
    borderColor: '#75E6FF',
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  buttonText2: {
    color: "black",
    fontWeight: "300",
    fontSize: 15,
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  searchImage: {
    width: 30,
    height: 30,
    marginLeft: 150,
    alignItems: 'flex-end',
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
