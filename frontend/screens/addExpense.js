import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import UserContext from '../UserLogin/UserContext'
const { StatusBarManager } = NativeModules;

const AddExpenseScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const { uid, gid } = route.params;


  const handleSave = () => {
    const expenseData = {
      title,
      description,
      amount,
    };
    saveExpenseDataToBackend(expenseData);
  };

  const saveExpenseDataToBackend = async (data) => {
    try {
      console.log("grp", gid)
      // Assuming you have an API endpoint to save group data
      var formattedData = {
        title: data.title,
        description: data.description,
        amount: data.amount,
        uid: uid,
        gid: UserContext.gid
      };
      const response = await fetch(
        "http://localhost:3000/splitter/addexpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Expense data saved vg successfully!");
        // route.params.onSaveSuccess(true);
        navigation.navigate("GroupsScreen");
      } else {
        console.error("Failed to save expense data:", response.status);
        // route.params.onSaveSuccess(false);
        navigation.navigate("GroupsScreen");
      }
    } catch (error) {
      console.error("Error saving expense data:", error.message);
    }
  };

  const handleAmountChange = (text) => {
    const number = parseFloat(text); // Parse the input string to a floating-point number
    setAmount(isNaN(number) ? 0 : number); // Set the state to the parsed number or 0 if it's not a valid number
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.inputContainergroup}>
        <Text style={styles.title}>Add New Expense</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Expense Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expense Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount in Rs."
            keyboardType="numeric"
            value={amount.toString()}
            // onChangeText={handleAmountChange}
            onChangeText={(amount) => setAmount(amount)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Expense</Text>
      </TouchableOpacity>
      {/* Additional content and functionality can be added as needed */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsla(111, 0%, 31%, 1)",
    flexDirection: "row-reverse",
    paddingTop:
      Platform && Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  inputContainergroup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: "hsla(111, 0%, 17%, 1)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 9,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    margin: 20,
  },
  refreshButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "hsla(330, 2%, 83%, 1)",
    padding: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 9,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    margin: 10,
    padding: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "hsla(330, 1%, 63%, 1)",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 9,
  },
  userItem: {
    backgroundColor: "hsla(330, 1%, 56%, 1)",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 9,
  },
  selectedUserItem: {
    backgroundColor: "hsla(330, 2%, 83%, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 9, // Change the background color for selected users
  },
  userName: {
    color: "black", // Change the text color for user names
  },
});

export default AddExpenseScreen;
