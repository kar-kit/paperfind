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
import { collection, query, where, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from '@react-navigation/native';
import { db, auth } from '../../../config';

//Page Function
function BioSaved({ navigation }) {
  //UseState Varibles for subfunctions and return data
  const [itemList, setItemList] = useState([]);
  const [userID, setUserID] = useState('');


  useEffect(() => {
    setItemList('')
    getUserID()
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setItemList('')
      retriveData()
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
          if (paper.subject == 'biology') {
            setItemList(arr => [...arr, {
              'title': paper.displayname,
              'link': paper.downloadurl,
              'examboard': paper.examboard,
              'subject': paper.subject,
              'id': doc.id
            }]);
          }
          console.log('ran successfully')
        }
      })
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  async function favoriteItem(idCred) {
    const itemRef = doc(db, 'users', userID)
    const docSnap = await getDoc(itemRef)

    if (docSnap.exists()) {
      if (docSnap.data().favorites.includes(idCred) === true) {
        await updateDoc(itemRef, {
          favorites: arrayRemove(idCred)
        });
        retriveData()
      }
      else if (docSnap.data().favorites.includes(idCred) === false) {
        await updateDoc(itemRef, {
          favorites: arrayUnion(idCred)
        });
        retriveData()
      }
    } else {
      // doc.data() will be undefined in this case
      const docData = {
        favorites: [idCred]
      }
      await setDoc(doc(db, "users", userID), docData);
    }

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
            source={require("../../assets/images/saved-icon.png")}
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
          <Text style={styles.headerText}>Saved Biology Papers</Text>
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

export default BioSaved;

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
    borderColor: '#B3FF8F',
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

});
