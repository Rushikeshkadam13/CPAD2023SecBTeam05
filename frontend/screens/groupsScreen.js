import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "../UserLogin/UserContext";

const GroupsScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [trxnGraph, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const showGroupDetails = async (group) => {
    // console.log(group);
    await updateGroup(group._id);
    console.log("jhgfdgfgfhjhjhgfh");
    setTransactions(group2.paymentGraph);
    console.log("trxn", trxnGraph, group2);
    console.log("got exp");
    console.log(group._id);
    UserContext.gid = group._id;

    await updateGroup(group._id);

    await getExpenses(group._id);

    await updateGroup(group._id);
    navigation.navigate("ViewGroupScreen", {
      // onSaveSuccess: (data) => {
      //   console.log("Save operation in CreateGroupScreen was successful");
      //   getGroups();
      // },
      trxnGraph: UserContext.paymentGraph,
      expenses: UserContext.expenses,
      selectedGroup: UserContext.gid,
    });
  };

  const updateGroup = async (gid) => {
    await getGroups();
    for (const grp of groups) {
      if (grp._id === gid) {
        console.log("group", grp);
        UserContext.paymentGraph = grp.paymentGraph;
        return grp;
      }
    }
    console.log("error .....................  ");
  };

  const getExpenses = async (gid) => {
    const api =
      "https://expense-splitter-service.onrender.com/splitter/getexpenses";
    await fetch(api + "?gid=" + UserContext.gid)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("expesnse", data);
        data.reverse();
        UserContext.expenses = data;
        setExpenses(data);
      })
      .catch((error) => {
        console.error("cannot get expenses, Error during GET request:", error);
      });
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

  const getGroups = async () => {
    const api =
      "https://expense-splitter-service.onrender.com/splitter/getgroups";
    const uid = UserContext.userid;

    await fetch(api + "?uid=" + uid)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("got froups", data);
        data.reverse();
        setGroups(data);
        UserContext.groups = data;
        console.log("asdsadsad", groups);
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });
  };
  const backToGroups = async () => {
    // navigation.navigate("ProfileTab");
    await getGroups();
  };
  useEffect(() => {
    console.log("user", UserContext);
    getGroups();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{groups.length} Groups</Text>
      <View style={styles.container}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.groupTitle}
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
                  if (userBalance.uid === UserContext.userid) {
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
                      <Text key={userBalance.uid} style={styles.userBalance}>
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
      <TouchableOpacity style={styles.backButton} onPress={backToGroups}>
        <MaterialIcons name="refresh" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.refreshButton} onPress={createGroup}>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>
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
  },
  verticalSection: {
    flex: 1,
    margin: 5,
  },
  title: {
    color: "white",
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 10,
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
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 5,
    backgroundColor: "hsla(111, 0%, 65%, 1)",
    padding: 10,
    borderRadius: 40,
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
    bottom: 15,
    right: 15,
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
