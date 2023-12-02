import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyScreen from "./screens/homeScreen"; // Import your screen
import CreateGroupScreen from "./screens/createGroup";
import AddExpenseScreen from "./screens/addExpense";
import GroupView from "./screens/groupView";
import LoginPage from "./screens/loginScreen";

import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreAllLogs();

console.disableYellowBox = true;

console.error = () => { };
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SplitExpenses" component={MyScreen} />
        <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
        <Stack.Screen name="ViewGroupScreen" component={GroupView} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
