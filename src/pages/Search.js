//Global Imports
import * as OpenAnything from 'react-native-openanything'

//Package Imports
import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll, getMetadata, list } from "firebase/storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

//User Imports
import { storage } from '../../config';
import { db } from '../../config';

import { collection, query, where, getDocs } from "firebase/firestore";


//Page Function
function Search({ navigation }) {
  //UseState Varibles for subfunctions and return data
  const [searchTerms, setSearchTerms] = useState('');
  const [itemList, setItemList] = useState([]);
  const [downloadLink, setDownloadLink] = useState();
  const [metadata, setMetadata] = useState();

  //Navigation Functions
  const onBackArrowPress = () => {
    navigation.navigate("Dashboard");
  };

  const onFilterSaved = () => {
    navigation.navigate("Saved");
  };

  const onFilterChem = () => {
    navigation.navigate("Chemistry");
  };



  const q = query(collection(db, "papers"), where('name', '==', searchTerms));

  async function retriveData() {

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const paper = doc.data()
      if (!itemList.includes(paper.name)) {

        setItemList(arr => [...arr, { 'title': paper.name, 'link': paper.downloadurl }]);


        console.log(itemList)
      }
    });
  }


  const Item = ({ title, link }) => (
    <TouchableOpacity style={styles.buttonSearch} onPress={() => OpenAnything.Pdf(link)}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image
        style={styles.searchImage}
        source={require("../assets/images/saved-icon.png")}
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} link={item.link} />
  );


  return (
    <View style={styles.containerPage}>

      <TouchableOpacity onPress={onBackArrowPress}>
        <Image
          source={require("../assets/images/back-arrrow.png")}
          style={styles.imageArrow}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="What would you like to find"
            placeholderTextColor='grey'
            value={searchTerms}
            onChangeText={(text) => setSearchTerms(text)}
            style={styles.input}
            autoCapitalize="sentences"
          />
        </View>
        <TouchableOpacity style={styles.buttonSearch} onPress={retriveData}>
          <Image
            style={styles.searchImage}
            source={require("../assets/images/search.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>

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

export default Search;

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
    padding: 10,
    // flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    marginLeft: 50,
  },
  profileIcon: {
    marginTop: -10,
    marginRight: 10,
  },
  inputContainer: {
    alignItems: 'center',
    width: "60%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 5,
    height: 50,
    width: 330,
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
    width: 30,
    height: 30,
  },
  buttonSearch: {
    backgroundColor: "white",
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
