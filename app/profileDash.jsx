import React from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";

const ProfileDash = () => {

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
        router.push("/")
      } else {
        Alert.alert('Vymazanie účtu zlyhalo');
      }
    } catch (error) {
      Alert.alert('Vymazanie účtu zlyhalo');
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
          source={require('./profile_picture.jpeg')}
          style={styles.profilePic}
        />
        <Text style={styles.username}>Profil</Text>
        <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteAccountButtonText}>Nenávratne vymazať účet a všetky uložené údaje</Text>
        </TouchableOpacity>
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
  deleteAccountButton: {
  backgroundColor: '#fa2f20',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: 'darkred',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
deleteAccountButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 16,
},

  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileDash;
