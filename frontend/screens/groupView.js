import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  NativeModules
} from "react-native";

const { StatusBarManager } = NativeModules;
import UserContext from "../UserLogin/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
const GroupView = ({ route, navigation }) => { 

  const { trxnGraph, expenses, agid } = route.params;

  const backToGroups = () => {
    navigation.goBack();
  }

  const addExpense = () => {
    navigation.navigate("AddExpenseScreen", {
      uid: UserContext.userid,
      gid: agid,
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={styles.container} >
          <FlatList
            data={trxnGraph}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>
                  {item.from === UserContext.userid ? "You" : item.from} Will Pay {item.balance} Rs. to {item.to === UserContext.userid ? "You" : item.to}
                </Text>
              </View>
            )}
          />
        </View >

      <Text style={styles.title}>
          Expenses in this group
        </Text>
      <View style={styles.container}>
        <FlatList
            data={UserContext.expenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.groupContainer}>
              <View >
                <View>
                  <Text style={styles.groupTitle}>{item.title}</Text>
                </View>
                <View >
                  <Text style={styles.groupDescription}>
                    {item.uid} Paid {item.amount} Rs.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={backToGroups}
        >
          <MaterialIcons
            name="close"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={addExpense}
        >
          <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsla(111, 0%, 31%, 1)",
    // flexDirection: "row-reverse",
    paddingTop:
      Platform && Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row-reverse",
    padding: 20,
  },
  horizontalSection: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verticalSection: {
    flex: 1,
    margin: 5,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    top: 10,
    left: 15,
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

export default GroupView;
