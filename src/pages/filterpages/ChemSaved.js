//Global imports
import * as OpenAnything from 'react-native-openanything'

//Package imports
import React, { useState, useEffect } from "react";
import { ref, listAll } from "firebase/storage";
import { getDownloadURL } from 'firebase/storage';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";

//User imports
import { storage } from '../../../config';

//Page Function
function ChemSaved({ navigation }) {
  //UseState Varibles for subfunctions and return data
  const [itemList, setItemList] = useState([]);
  const [downloadLink, setDownloadLink] = useState();
  const [metadata, setMetadata] = useState();

  //Hook run once when page loads
  useEffect(() => {
    listAllFunc()
  }, []);

  //Navigation Functions
  const onBackArrowPress = () => {
    navigation.navigate("Dashboard");
  };


  //Storage reference
  const listRef = ref(storage, 'chemistry');
  //Function reading all item data in storage reference
  const listAllFunc = () => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          //For each item in storage directory get the name of the item
          //And the download link and store in useState array
          getDownloadURL(item).then((url) => {
            setItemList(arr => [...arr, { 'title': item.name, 'link': url }]);
          })
        });
      }).catch((error) => {
        //Show any errors in the terminal
        console.log(error)
      });
  }


  //Flatlist render function
  const renderItem = ({ item }) => (
    <Item title={item.title} link={item.link} />
  );

  //FLatlist content
  const Item = ({ title, link }) => (
    <TouchableOpacity style={styles.buttonSearch} onPress={() => OpenAnything.Pdf(link)}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image
        style={styles.searchImage}
        source={require("../../assets/images/saved-icon.png")}
      />
    </TouchableOpacity>
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
          <Text style={styles.headerText}>Saved Chem Papers</Text>
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
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignContent: 'center',
  },
  profileIcon: {
    marginTop: -10,
    marginRight: 10,
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
  resultContiner: {
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 22,
    flexDirection: "row",
    justifyContent: 'flex-start',
    padding: 10,
  },
  searchImage: {
    marginTop: 4,
    marginLeft: 140,
    width: 40,
    height: 40,
  },
  buttonSearch: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    minWidth: '90%',
    padding: 10,
    flexDirection: "row",
  },
  buttonSearchContainer: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: 'flex-start',
  },

  imagecontainer: {
    marginTop: -140,
    justifyContent: 'flex-end',
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
