import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../config";

const Calendar = ({ navigation }) => {
  //Datepicker useStates
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //Todolist useStates
  const [entityText, setEntityText] = useState("");
  const [toDos, setToDos] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, [date]);

  async function fetchData() {
    date.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid),
      where("dateSet", "==", date),
      orderBy("timestamp")
    );
    const querySnapshot = await getDocs(q);
    const toDos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    setToDos(toDos);
    // console.log(toDos);
  }
  (error) => {
    console.log(error);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDate(date);
    fetchData();
    hideDatePicker();
  };

  const addToDo = async (todo) => {
    let toDoToSave = {
      timestamp: serverTimestamp(),
      text: entityText,
      completed: false,
      userId: auth.currentUser.uid,
      dateSet: date,
    };
    const docRef = await addDoc(collection(db, "tasks"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };

  const deleteTask = async (itemId) => {
    console.log("Current Item Id: ", itemId);

    await deleteDoc(doc(db, "tasks", itemId));
    fetchData();
  };

  const renderToDoItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.pageBorder}>
      <TouchableOpacity
        style={styles.hamMenu}
        onPress={() => navigation.openDrawer()}
      >
        <Image source={require("../assets/images/ham-menu.png")} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Tasks For {date.toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.backdrop}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new entity"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={addToDo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.shiftContainer}>
          <TouchableOpacity style={styles.buttonShift} onPress={showDatePicker}>
            <Text style={styles.buttonTextShift}>Change Date</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Tasks Set</Text>
        </View>
        {toDos && (
          <View style={styles.listContainer}>
            <FlatList
              data={toDos}
              renderItem={renderToDoItem}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  pageBorder: {
    flex: 1,
    marginTop: 35,
  },
  hamMenu: {
    marginLeft: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    marginLeft: 25,
    marginTop: 10,
  },
  headerText: {
    fontFamily: "Inter-Black",
    fontSize: 35,
  },
  subContainer: {
    marginLeft: 35,
    marginTop: 20,
  },
  subText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 30,
    color: "white",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "#d5bdff",
    borderRadius: 20,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    width: 30,
    height: 30,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 30,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontFamily: "Inter-SemiBold",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 0,
    marginLeft: 10,
    padding: 20,
  },
  entityContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
    fontFamily: "Inter-Regular",
  },
  shiftContainer: {
    flexDirection: "row",
    height: 70,
    marginTop: 0,
    marginBottom: 0,
    // flex: 1,
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  buttonShift: {
    padding: 10,
    flex: 1,
    height: 47,
    borderRadius: 5,
    backgroundColor: "#75ebae",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextShift: {
    fontFamily: "Inter-SemiBold",
    color: "white",
    fontSize: 16,
  },
});
