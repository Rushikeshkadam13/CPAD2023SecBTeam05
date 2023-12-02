// SignUpScreen.js

import React, { useState } from "react";
import { View, TextInput, Image, Button, StyleSheet, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import bcrypt from "react-native-bcrypt";
//import { useNavigation } from "@react-navigation/native";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [hPass, sethPass] = useState("");
  const handleSignUp = async () => {
    console.log("inside handleSignUp");
    const signupData = {
      username,
      email,
      password,
    };
    // console.log("hhhh", hPass);
    saveUserDataToBackend(signupData);
  };

  const saveUserDataToBackend = async (data) => {
    try {
      console.log(data);
      console.log("in saveUserDataToBackend");
      // Assuming you have an API endpoint to save group data
      var formattedData = {
        username: data.username,
        uid: data.email,
        password: data.password,
      };
      const response = await fetch(
        "https://expense-splitter-service.onrender.com/splitter/adduser",
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
        console.log("User registered Succesfully");
        navigation.navigate("LoginScreen");
      } else {
        console.error("Failed to register user", response.status);
      }
    } catch (error) {
      console.error("Error registering user", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EquiSplit</Text>
      <Image
        source={require("../eqiSplit.png")} // Replace with the path to your image
        style={{
          width: 100,
          height: 100,
          borderRadius: 40,
          position: "absolute",
          top: 45,
        }} // Adjust width and height as needed
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textShadowColor: "rgba(0, 0, 5, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
    position: "absolute",
    fontSize: 30,
    color: "white",
    top: 150,
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

export default SignUpScreen;
