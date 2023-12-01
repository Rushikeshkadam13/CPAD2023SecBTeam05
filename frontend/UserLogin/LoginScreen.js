// LoginScreen.js

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
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
            const response = await fetch("http://localhost:3000/splitter/login", {
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
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;
