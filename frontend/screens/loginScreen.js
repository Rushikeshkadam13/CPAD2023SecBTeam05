

import { React, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Avatar, Button } from "react-native-elements";
import { View, Text, Image, SafeAreaView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
    Platform,
    NativeModules,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import LoginScreen from "../UserLogin/LoginScreen";
import SignUpScreen from "../UserLogin/SignupScreen";

const Tab = createBottomTabNavigator();
const LoginPage = ({ navigation }) => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "hsla(111, 0%, 17%, 1)",
                paddingTop:
                    Platform && Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
            }}
        >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "LoginScreen") {
                            iconName = focused ? "home" : "home";
                        } else if (route.name === "SignUpScreen") {
                            iconName = focused ? "people" : "people";
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "darkgrey",
                    tabBarShowLabel: false,
                    tabBarStyle: [
                        {
                            // "height": "60",
                            display: "flex",
                            paddingBottom: 6,
                            backgroundColor: "hsla(111, 0%, 17%, 1)",
                        },
                        null,
                    ],
                })}
            >

                <Tab.Screen name="LoginScreen" component={LoginScreen} />
                <Tab.Screen name="SignUpScreen" component={SignUpScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}
export default LoginPage;