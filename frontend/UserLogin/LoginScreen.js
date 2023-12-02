// LoginScreen.js

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import UserContext from "../UserLogin/UserContext"
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "../screens/homeScreen";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            // navigation.navigate("HomeScreen");
            const loginData = {
                username: username,
                password: password,
            };

            // Send login request to backend
            const response = await fetch("https://expense-splitter-service.onrender.com/splitter/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            }).catch((res) => {
                console.log(res);
            });

            const data = await response.json();
            console.log(data);
            if (data.authenticated == true) {
                console.log("authenticated");
                console.log(data);
                UserContext.userid = data.username;
                navigation.navigate("SplitExpenses");
            } else {
                console.log("faol")
                setUsername("");
                setPassword("");
                navigation.navigate("Login");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <View style={styles.container}>

            <Image
                source={require("../eqiSplit.png")} // Replace with the path to your image
                style={{
                    width: 90,
                    height: 90,
                    borderRadius: 40
                }} // Adjust width and height as needed
            />
            <Text style={styles.header}>EquiSplit</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.refreshButton} onPress={handleLogin}>
                <Text >Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        textShadowColor: "rgba(0, 0, 5, 0.3)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        letterSpacing: 1,
        fontSize: 24,
        color: "white",
        margin: 20,
        fontWeight: "bold",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "hsla(111, 0%, 40%, 1)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    refreshButton: {
        backgroundColor: "turquoise",
        margin: 10,
        padding: 14,
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
    input: {
        borderRadius: 14,
        height: 40,
        width: "100%",
        borderCurve: "circular",
        borderWidth: 1,
        backgroundColor: "white",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
