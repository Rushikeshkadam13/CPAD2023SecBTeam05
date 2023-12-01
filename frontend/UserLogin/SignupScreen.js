// SignUpScreen.js

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
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
      const response = await fetch("http://localhost:3000/splitter/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
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

export default SignUpScreen;
