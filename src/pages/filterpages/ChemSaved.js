//Package imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";

import { getStorage, ref, listAll, getMetadata, list } from "firebase/storage";
import { getDownloadURL } from 'firebase/storage';


function ChemSaved({ navigation }) {
  const [itemList, setItemList] = useState([]);
  const [metadata, setMetadata] = useState();

  useEffect(() => {
    listAllFunc()
  }, []);


  const onBackArrowPress = () => {
    navigation.navigate("Dashboard");
  };


  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, 'chemistry');

  const listAllFunc = () => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          item.getDownloadURL.then((url) => {

            setItemList(arr => [...arr, { title: item.name, link: url }]);
          })
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  const Item = ({ title }) => (
    <TouchableOpacity style={styles.buttonSearch}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image
        style={styles.searchImage}
        source={require("../../assets/images/saved-icon.png")}
      />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
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


        <View style={styles.resultContiner} />

        <TouchableOpacity style={styles.buttonSearch} onPress={console.log(itemList)}>
          <Text style={styles.buttonText}>Temp</Text>
          <Image
            style={styles.searchImage}
            source={require("../../assets/images/saved-icon.png")}
          />
        </TouchableOpacity>

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
    marginLeft: 30,
    width: 40,
    height: 40,
  },
  buttonSearch: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'flex-start',
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
