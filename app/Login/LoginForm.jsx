import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Pressable} from 'react-native';
import axios from 'axios';
import {COLORS} from "../../constants";
import {Link, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
     axios.post('https://hesla.sk/api/login', {
                username: username,
                password: password
            })
            .then(function (response) {
                // Check if login was successful
                if (response.data.message === 'Login successful') {
                    // Store the access token in AsyncStorage
                    AsyncStorage.setItem('access_token', response.data.access_token);
                    AsyncStorage.setItem('username', username); // Set the username in localStorage

                    // Redirect to the dashboard page
                  router.replace('/dashboard');
                }
                else if (response.data.message === 'Login unsuccessful'){
                  Alert.alert('Nesprávne meno alebo heslo');
                }
                else {
                    alert('Login Failed!' + '\n' + 'Please try again.')

                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Login failed. Please try again.');
            });
        }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vitajte späť!</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Zadajte meno"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Zadajte heslo"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Prihlásiť sa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Register/register")}>
        <Text style={styles.switchText}>
          Nemám učet!
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
  switchText: {
    color: '#5A67D8',
    marginTop: 15,
    textAlign: 'center',
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
    backgroundColor: '#007BFF',
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
});

export default LoginForm;