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
import { collection, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";

import { db } from '../../../config';

//Page Function
function ChemSaved({ navigation }) {
  //UseState Varibles for subfunctions and return data
  const [searchTerms, setSearchTerms] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList('')
    retriveData()
  }, []);


  async function retriveData() {
    const q = query(collection(db, "papers"), where("favorite", "==", true), where('subject', '==', 'chemistry'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const paper = doc.data()
      setItemList(arr => [...arr, {
        'title': paper.displayname,
        'link': paper.downloadurl,
        'examboard': paper.examboard,
        'subject': paper.subject,
        'id': doc.id
      }]);
      console.log('ran successfully')
    });
  }


  async function favoriteItem(idCred) {
    const itemRef = doc(db, 'papers', idCred)
    const docSnap = await getDoc(itemRef)

    // await updateDoc(itemRef, {
    //   favorite: true
    // });

    if (docSnap.exists()) {
      if (docSnap.data().favorite === true) {
        await updateDoc(itemRef, {
          favorite: false
        });
      }
      else if (docSnap.data().favorite === false) {
        await updateDoc(itemRef, {
          favorite: true
        });
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
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
          <Text style={styles.headerText}>Saved Chemistry Papers</Text>
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

export default ChemSaved;

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
    borderColor: '#FF7171',
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
