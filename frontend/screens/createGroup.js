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

const { StatusBarManager } = NativeModules;

const CreateGroupScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const api = "http://localhost:3000/splitter/getusers";
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getusers();
  }, []);
  const getusers = () => {
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        setUsers(data);
        data.reverse();

        // setGroups(data); // Set the groups in the state
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });
  };
  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.includes(userId)
        ? prevUsers.filter((id) => id !== userId)
        : [...prevUsers, userId]
    );
  };

  const handleSave = () => {
    const groupData = {
      title,
      description,
      selectedUsers,
    };
    console.log("groupinfo", groupData);
    saveGroupDataToBackend(groupData);
  };

  const saveGroupDataToBackend = async (data) => {
    try {
      // Assuming you have an API endpoint to save group data
      var formattedData = {
        groupTitle: data.title,
        groupDescription: data.description,
        users: data.selectedUsers,
      };
      const response = await fetch(
        "http://localhost:3000/splitter/creategroup",
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
        console.log("Group data saved successfully!");
        route.params.onSaveSuccess(true);
        Toast.show({
          type: "success",
          text1: "Expense saved",
          text2: "Expense data saved successfully!",
          visibilityTime: 15000,
        });
        navigation.navigate("GroupsScreen");
      } else {
        console.error("Failed to save group data:", response.status);
        route.params.onSaveSuccess(false);
        navigation.navigate("GroupsScreen");
      }
    } catch (error) {
      console.error("Error saving group data:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.inputContainergroup}>
        <Text style={styles.title}>Create New Group</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Group Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Group Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <Text style={styles.subtitle}>Select Users for the Group:</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.userItem,
                selectedUsers.includes(item.uid) && styles.selectedUserItem,
              ]}
              onPress={() => toggleUserSelection(item.uid)}
            >
              <Text style={styles.userName}>
                {item.username} ({item.uid})
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Group</Text>
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

export default CreateGroupScreen;
