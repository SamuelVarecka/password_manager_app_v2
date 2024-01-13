import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { COLORS } from "../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    axios.post('https://hesla.sk/api/register', {
      username: username,
      password: password
    })
    .then(function (response) {
      // Check if registration was successful
      if (response.data.message === 'User registered successfully') {
        Alert.alert('Success', 'Registrácia úspešná', [
          { text: "OK", onPress: () => router.replace('/') }
        ]);
      }
      else {
        Alert.alert('Registration Failed', 'Please try again.');
      }
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert('Registration Failed', 'Please try again.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Používaťelské meno"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Použivaťeľké heslo"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrovať</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.switchText}>
          Už máte účet?
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#5A67D8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  switchText: {
    color: '#5A67D8',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default RegisterForm;
