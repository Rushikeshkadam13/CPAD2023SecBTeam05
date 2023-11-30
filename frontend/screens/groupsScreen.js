import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const GroupsScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const showGroupDetails = (group) => {
    console.log(group);
    setSelectedGroup(group);
    getExpenses(group._id);
  };

  const hideGroupDetails = () => {
    setSelectedGroup(null);
  };

  const createGroup = () => {
    navigation.navigate("CreateGroupScreen", {
      onSaveSuccess: (data) => {
        console.log("Save operation in CreateGroupScreen was successful");
        getGroups();
      },
    });
  };

  const handleSettleUp = async (data) => {
    console.log("in handlesettel");
    try {
      // Assuming you have an API endpoint to save group data
      var formattedData = {
        expenseTitle: data.title,
        expenseDescription: data.description,
        amount: data.amount,
        uid: data.uid,
      };
      const response = await fetch(
        "https://expense-splitter-service.onrender.com/splitter/settletransaction",
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
        console.log("Expense settle up successfully!");
        // Toast.show({
        //   type: "success",
        //   text1: "Expense saved",
        //   text2: "Expense data saved successfully!",
        //   visibilityTime: 15000,
        // });
        navigation.navigate("GroupsScreen");
      } else {
        console.error("Failed to settle up", response.status);
        route.params.onSaveSuccess(false);
        navigation.navigate("GroupsScreen");
      }
    } catch (error) {
      console.error("Error while settle up:", error.message);
    }
  };

  const addExpense = (group) => {
    navigation.navigate("AddExpenseScreen", {
      onSaveSuccess: (data) => {
        console.log("Save operation in AddExpenseScreen was successful");
        console.log("data", data);
        getExpenses(data.uid);
      },
    });
  };

  const getGroups = () => {
    const api =
      "https://expense-splitter-service.onrender.com/splitter/getgroups";
    const uid = "1@gmail.com";

    fetch(api + "?uid=" + uid)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.reverse();
        setGroups(data);
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });
  };

  const getExpenses = (gid) => {
    const api =
      "https://expense-splitter-service.onrender.com/splitter/getexpenses";
    console.log(api);
    fetch(api + "?gid=" + gid)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.reverse();
        setExpenses(data);
        console.log("asdsad", data);
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <View style={styles.page}>
      {selectedGroup ? (
        <View style={styles.groupDetailsContainer}>
          <TouchableOpacity
            style={{ marginTop: 50, marginLeft: 0 }}
            onPress={hideGroupDetails}
          >
            <MaterialIcons
              style={{ marginTop: 40 }}
              name="close"
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Expenses under this group {expenses.length}
          </Text>
          <View>
            <FlatList
              data={expenses}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.groupContainer}>
                  <View style={styles.horizontalSection}>
                    <View style={styles.verticalSection}>
                      <Text style={styles.groupTitle}>{item.title}</Text>
                    </View>

                    <View style={styles.verticalSection}>
                      <Text style={styles.groupDescription}>
                        {item.uid} Paid {item.amount} Rs.
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.settleUpButton}
                        onPress={handleSettleUp} // Implement the handleSettleUp function
                      >
                        <MaterialIcons
                          name="done"
                          size={24}
                          color="white"
                          fontWeight="bold"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.addExpenseButton}
            onPress={addExpense}
          >
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>
            You are included in {groups.length} Groups
          </Text>
          <View style={styles.container}>
            <FlatList
              data={groups}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.groupContainer}
                  onPress={() => showGroupDetails(item)}
                >
                  <View style={styles.horizontalSection}>
                    <View style={styles.verticalSection}>
                      <Text style={styles.groupTitle}>{item.groupTitle}</Text>
                    </View>

                    <View style={styles.verticalSection}>
                      <Text style={styles.groupDescription}>
                        {item.groupDescription}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.verticalSection}>
                    {item.userBalances.map((userBalance) => {
                      if (userBalance.uid === "1@gmail.com") {
                        const balance = userBalance.balance;
                        let balanceText = "";

                        if (balance === 0) {
                          balanceText = "You are settled up.";
                        } else if (balance > 0) {
                          balanceText = `You are owed ${balance} Rs.`;
                        } else {
                          balanceText = `You owe ${Math.abs(balance)} Rs.`;
                        }

                        return (
                          <Text
                            key={userBalance.uid}
                            style={styles.userBalance}
                          >
                            {balanceText}
                          </Text>
                        );
                      }
                      return null;
                    })}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={createGroup}>
            <Text style={styles.buttonText}>Create Group</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsla(111, 0%, 31%, 1)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    padding: 20,
  },
  horizontalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  verticalSection: {
    flex: 1,
    margin: 5,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    justifyContent: "center",
    width: "500",
    backgroundColor: "hsla(111, 0%, 17%, 1)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  groupDescription: {
    color: "white",
    marginBottom: 10,
  },
  usersContainer: {
    marginTop: 10,
  },
  usersLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  user: {
    color: "white",
    fontSize: 14,
  },
  userBalancesContainer: {
    marginTop: 10,
  },
  userBalancesLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userBalance: {
    color: "white",
    fontSize: 18,
    paddingBottom: 10,
  },
  addExpenseButton: {
    position: "absolute",
    bottom: 120,
    right: 0,
    backgroundColor: "hsla(111, 0%, 65%, 1)",
    padding: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.84,
    elevation: 6,
  },
  refreshButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "hsla(111, 0%, 65%, 1)",
    padding: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.84,
    elevation: 6,
  },
  buttonText: {
    color: "black",
    backgroundColor: "hsla(111, 0%, 65%, 1)",
    marginBottom: "50",
  },
  settleUpButton: {
    backgroundColor: "#00e64d",
    padding: 8,
    marginLeft: 2,
    borderRadius: 7,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 6,
  },
  settleUpText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default GroupsScreen;
