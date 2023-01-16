//Global Imports
import * as OpenAnything from 'react-native-openanything'

//Package Imports
import React, { useState } from "react";

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
import { db, auth } from '../../config';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {  onAuthStateChanged } from "firebase/auth";
import fillIcon from '../assets/images/fill-saved-icon.png'
import nonFillIcon from '../assets/images/saved-icon.png'
import { useFocusEffect } from '@react-navigation/native';

//Page Function
function Search({ navigation }) {
  //UseState Varibles for subfunctions and return data
  const [searchTerms, setSearchTerms] = useState('');
  const [itemList, setItemList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showItems, setShowItems] = useState(true);
  const [examBoardChoice, setExamBoardChoice] = useState('edexcel')
  const [firebaseQuery, setFirebaseQuery] = useState(query(collection(db, "papers"), where('examboard', '==', examBoardChoice)));

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive8, setIsActive8] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      async function runFunctionsInOrder() {
        await setItemList('');
        await retriveData();
      }
      runFunctionsInOrder();
    }, [searchTerms, examBoardChoice,firebaseQuery])
  );


  //Navigation Functions
  const onBackArrowPress = () => {
    navigation.navigate("Dashboard");
  };

  const swapElements1 = () => {
    setShowFilters(true)
    setShowItems(false)
  }

  const swapElements2 = () => {
    setShowFilters(false)
    setShowItems(true)
  }

  const bioFilter = () => {
    if (isActive1 === false) {
      setFirebaseQuery(query(collection(db, "papers"), where('subject', '==', 'biology')))
      setIsActive1(true)

      setIsActive2(false)
      setIsActive3(false)
      setIsActive4(false)
    } else {
      setFirebaseQuery(query(collection(db, "papers")))
      setIsActive1(false)
    }
  }

  const chemFilter = () => {
    if (isActive1 === false) {
      setFirebaseQuery(query(collection(db, "papers"), where('subject', '==', 'chemistry')))
      setIsActive2(true)

      setIsActive1(false)
      setIsActive3(false)
      setIsActive4(false)
    } else {
      setFirebaseQuery(query(collection(db, "papers")))
      setIsActive2(false)
    }
  }

  const aqaFilter = () => {
    if (isActive5 === false) {
      setExamBoardChoice('aqa')
      setIsActive5(true)

      setIsActive6(false)
      setIsActive7(false)
      setIsActive8(false)
    } else {
      setExamBoardChoice('edexcel')
      setIsActive5(false)
    }
  }

  const edexcelFilter = () => {
    if (isActive6 === false) {
      setExamBoardChoice('edexcel')
      setIsActive6(true)

      setIsActive5(false)
      setIsActive7(false)
      setIsActive8(false)
    } else {
      setExamBoardChoice('edexcel')
      setIsActive6(false)
    }
  }

  async function retriveFav() {
    let userFav;
    await new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            userFav = docSnap.data().favorites
            resolve(userFav); 
          }
        } else {
          console.log('error cannot find user id')
        }
      });
    });
    return userFav;
  }
  


  async function retriveData() {
    setItemList('')
    const favs = await retriveFav();
    
    
    let formattedSearchTerm = searchTerms.toLowerCase().replace(/\s/g, "");
    const q = firebaseQuery;
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const paper = doc.data()
      if (paper.name.toLowerCase().replace(/\s/g, "").includes(formattedSearchTerm) === true) {
        if (itemList.includes(doc.id) === false && paper.examboard === examBoardChoice) {

          // console.log(favs);

          if (favs.includes(doc.id)) {
            setItemList(arr => [...arr, {
              'title': paper.displayname,
              'link': paper.downloadurl,
              'examboard': paper.examboard,
              'subject': paper.subject,
              'id': doc.id,
              'favorite': fillIcon
            }]);
            console.log('favorite item loaded')
          } else {
            setItemList(arr => [...arr, {
              'title': paper.displayname,
              'link': paper.downloadurl,
              'examboard': paper.examboard,
              'subject': paper.subject,
              'id': doc.id,
              'favorite': nonFillIcon
            }]);
            console.log('non-favorite item loaded')
          }
          
        }
      }
    });
  }


  const Item = ({ title, link, examboard, subject, idCred, favorite }) => (
    <TouchableOpacity style={styles.buttonItem} onPress={() => OpenAnything.Pdf(link)}>
      <View style={styles.buttonHeader}>
        <Text style={styles.buttonText}>{title}</Text>


        <TouchableOpacity onPress={() => favoriteItem(idCred)}>
          <Image
            style={styles.searchImage}
            source={favorite}
          />
        </TouchableOpacity>


      </View>
      <View>
        <Text style={styles.buttonText2}>{subject} {examboard}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} link={item.link} subject={item.subject} examboard={item.examboard} idCred={item.id} favorite={item.favorite} />
  );

  async function favoriteItem(idCred) {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.uid)
        const itemRef = doc(db, 'users', uid)
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
          await setDoc(doc(db, "users", uid), docData);

          retriveData()
        }
      } else {
        console.log('error cannot find user id')
      }
    });


    

  }

  return (
    <View style={styles.containerPage}>

      <TouchableOpacity onPress={onBackArrowPress}>
        <Image
          source={require("../assets/images/back-arrrow.png")}
          style={styles.imageArrow}
        />
      </TouchableOpacity>


      <View style={styles.header}>

        <TouchableOpacity style={styles.filterSelectButton} onPress={swapElements1}>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>

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
      </View>

      {showFilters ?
        (
          <View>
            <View style={styles.filterContainer}>
              <View style={styles.filterTextS}>
                <Text style={styles.filterTextST}>Subject</Text>
              </View>

              <View style={styles.filterSection}>
                <View style={styles.filterSub}>
                  {isActive1 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => bioFilter()}>
                      <Text>Biology</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => bioFilter()}>
                      <Text>Biology</Text>
                    </TouchableOpacity>
                  )}



                </View>

                <View style={styles.filterSub}>
                  {isActive2 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => chemFilter()}>
                      <Text>Chemistry</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => chemFilter()}>
                      <Text>Chemistry</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.filterSection}>
                <View style={styles.filterSub}>
                  {isActive3 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => setIsActive3(false)}>
                      <Text>Physics</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => setIsActive3(true)}>
                      <Text>Physics</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.filterSub}>
                  {isActive4 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => setIsActive4(false)}>
                      <Text>Maths</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => setIsActive4(true)}>
                      <Text>Maths</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>


            <View style={styles.filterContainer}>
              <View style={styles.filterTextS}>
                <Text style={styles.filterTextST}>Exam Board</Text>
              </View>

              <View style={styles.filterSection}>
                <View style={styles.filterSub}>
                  {isActive5 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => aqaFilter()}>
                      <Text>AQA</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => aqaFilter()}>
                      <Text>AQA</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.filterSub}>
                  {isActive6 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => edexcelFilter()}>
                      <Text>Edexcel</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => edexcelFilter()}>
                      <Text>Edexcel</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.filterSection}>
                <View style={styles.filterSub}>
                  {isActive7 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => setIsActive7(false)}>
                      <Text>OCR</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => setIsActive7(true)}>
                      <Text>OCR</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.filterSub}>
                  {isActive8 ? (
                    <TouchableOpacity style={styles.buttonFilterOff} onPress={() => setIsActive8(false)}>
                      <Text>WJEC</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.buttonFilterOn} onPress={() => setIsActive8(true)}>
                      <Text>WJEC</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Button onPress={swapElements2} title='Confirm' />
            </View>

          </View>
        ) : null}

      <View style={styles.container}>

        {showItems ?
          (
            <SafeAreaView>
              <FlatList
                data={itemList}
                renderItem={renderItem}
              />
            </SafeAreaView>
          ) : null}

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
  buttonHeader: {
    flexDirection: "row",
    marginBottom: -10,
  },
  container: {
    marginTop: 20,
    marginLeft: -10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    padding: 10,
    // flex: 1,
    // flexDirection: "center",
    // justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 50,
  },
  filterSelectButton: {
    marginTop: -10,
    marginLeft: 250,
  },
  filterText: {
    color: '#79CFFF',
    fontFamily: 'Inter-Black',
    fontSize: 15
  },
  filterSection: {
    marginLeft: 25,
    flexDirection: 'row',
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
    justifyContent: 'flex-start',
    marginTop: -150,
  },
  filterSub: {
    padding: 5,
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
  buttonSearch: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 330,
  },

  buttonFilterOn: {
    backgroundColor: "white",
    justifyContent: 'flex-end',
    padding: 15,
    borderRadius: 10,
    width: 160,
  },
  buttonFilterOff: {
    backgroundColor: "#D0D0D0",
    justifyContent: 'flex-end',
    padding: 15,
    borderRadius: 10,
    width: 160,
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
  filterContainer: {
    marginTop: 10,
  },
  filterTextS: {
    marginLeft: 30,
  },
  filterTextST: {
    color: "black",
    fontWeight: "500",
    fontSize: 17,
    flexDirection: "row",
    justifyContent: 'flex-start'
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
  filterButtonText2: {
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
