import React from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";

const ProfileDash = ({ navigation }) => {

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteAccount() }
      ]
    );
  };

  const deleteAccount = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('access_token');
      const response = await axios.post('https://hesla.sk/api/delete_account', {}, {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });

      if (response.data.message === 'Account deleted successfully') {
        await AsyncStorage.removeItem('access_token');
        navigation.navigate('Login'); // Assuming 'Login' is the route name for your login screen
      } else {
        console.error('Error deleting account:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Späť na Dashboard"
          onPress={() => router.push("/dashboard")}
        />
      </View>
      <View style={styles.profileCard}>
        <Image
          source={require('./profile_picture.jpeg')} // Replace with your local image
          style={styles.profilePic}
        />
        <Text style={styles.username}>Profil</Text>
        <Button
          title="Delete Account"
          color="red"
          onPress={handleDeleteAccount}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  profileCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    elevation: 3,
    padding: 20,
    borderRadius: 10,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileDash;
