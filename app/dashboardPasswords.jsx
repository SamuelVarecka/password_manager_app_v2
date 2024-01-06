import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Modal,} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";
import {COLORS} from "../constants";
import AddPasswordModal from "./addPasswordModal";
import EditPasswordModal from "./editPasswordModal";


const DashboardPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [arePasswordsVisible, setArePasswordsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedPassword, setSelectedPassword] = useState(null);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
        const jwtToken = await AsyncStorage.getItem('access_token');
        const username = await AsyncStorage.getItem('username');

        // Make an API request to fetch passwords from the server
        const response = await axios.post('https://hesla.sk/api/view_passwords', {
            username: username // Use the username stored in AsyncStorage
        }, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

        const data = response.data;
        // If passwords are received or if passwords is not an array, update the state
        // If passwords is undefined or not an array, set an empty array instead
        setPasswords(Array.isArray(data.passwords) ? data.passwords : []);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        // Set an empty array if there is an error fetching passwords
        setPasswords([]);
    }
};
  const copyToClipboard = (password) => {
    Clipboard.setString(password);
    alert('Password copied to clipboard!'); // Optional: Provide user feedback
  };

  const addPassword = async () => {
    const token = await AsyncStorage.getItem('access_token');
  };

  const handleAddPassword = async (passwordData) => {
  try {
    const jwtToken = await AsyncStorage.getItem('access_token'); // Get the JWT token from AsyncStorage

    // Send a POST request to the server's API to add the password
    const response = await axios.post('https://hesla.sk/api/add_password', {
      platform: passwordData.platform,
      login: passwordData.username, // Use the username from passwordData
      password: passwordData.password,
    }, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });

    if (response.data.message === 'Password saved successfully') {
      // Password added successfully, update the displayed passwords
      fetchPasswords(); // Assuming fetchPasswords is a function that updates the state with the latest passwords
    } else {
      console.error('Error adding password:', response.data.message);
    }
  } catch (error) {
    console.error('Error adding password:', error);
  }
};

  const openEditModal = (password) => {
    setSelectedPassword(password); // Set the selected password
    setIsEditModalVisible(true); // Open the modal
  };

  const handleEditPassword = async (passwordData) => {
    if (!selectedPassword) return;
    try {
      const jwtToken = await AsyncStorage.getItem('access_token');

      const responce = await axios({
        method: "post",
        url: "https://hesla.sk/api/change_password",
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          password_id: parseInt(passwordData.password_id, 10),
          new_username: passwordData.new_username, // Send null if no new username
          new_password: passwordData.new_password, // Send null if no new password
        }
      });
      if (responce.data.message === 'Password changed successfully') {
        setSelectedPassword(null);
        await fetchPasswords()
      } else {
        console.error('Error changing password:', response.data.message);
      }
    } catch (error) {
      if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error changing password:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error changing password: No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error changing password:', error.message);
    }
    }
  }

  const deletePass = async (passwordId) => {
  try {
    const jwtToken = await AsyncStorage.getItem('access_token');

    // Send a POST request to the server's API to delete the password
    const response = await axios({
      method: 'post',
      url: 'https://hesla.sk/api/delete_password',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        password_id: passwordId, // Ensure this matches the expected format
      }
    });

    if (response.data.message === 'Password successfully deleted') {
      // Password deleted successfully, update the displayed passwords
      fetchPasswords(); // Ensure this function is defined and correctly updates the state
    } else {
      console.error('Error deleting password:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error deleting password:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error deleting password: No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error deleting password:', error.message);
    }
  }
};



  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    // Navigate to login screen
    router.replace('/');
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleAllPasswordsVisibility = () => {
    setArePasswordsVisible(!arePasswordsVisible);
  };

  return (
    <View style={styles.container}>

      {/* Add Password Button */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.addPasswordButton]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>Pridať nové heslo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.toggleButton]}
          onPress={toggleAllPasswordsVisibility}
        >
          <Text style={styles.buttonText}>
            {arePasswordsVisible ? "Skry heslá" : "Ukáž heslá"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <AddPasswordModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddPassword}
        />
      </View>

      {/* Password Form Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFormVisible}
        onRequestClose={toggleFormVisibility}
      >
        <View style={styles.modalView}>
          {/* Form Fields */}
          {/* ... */


          /* Submit Button */}
          <Button title="Submit" onPress={addPassword} color="#5A67D8" />

          {/* Close Form Button */}
          <Button title="Close" onPress={toggleFormVisibility} color="#FF414D" />
        </View>
      </Modal>

      <EditPasswordModal
        isVisible={isEditModalVisible}
        onClose={() => { setIsEditModalVisible(false); setSelectedPassword(null); }}
        onSubmit={handleEditPassword}
        passwordId={selectedPassword?.id} // Pass the selected password ID
      />

      <ScrollView style={styles.passwordList}>
        {passwords.map((item) => (
          <View key={item.id} style={styles.passwordItem}>
            <Text style={styles.itemText}>
              Platform: {item.platform}
            </Text>
            <Text style={styles.itemText}>
              Username: {item.username}
            </Text>
            <Text style={styles.itemText}>
              Password: {arePasswordsVisible ? item.password : '••••••••'}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.editButton}
              onPress={() => openEditModal(item)} // Open edit modal with the current item's data
                >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
              <Button
              title="Kopirovať heslo"
              onPress={() => copyToClipboard(item.password)}
              />
              <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePass(item.password_id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite, // A neutral background color
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    backgroundColor: '#FFF', // A light background for the header
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#FFF', // A light background for the form
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD', // A subtle border color
    backgroundColor: '#FFF', // A white background for the input
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordList: {
    margin: 15,
  },
  passwordItem: {
    backgroundColor: '#FFF', // A white background for the items
    borderRadius: 8,
    padding: 10,
    // Increase margin to give space for the shadow
    marginLeft: 10, // Adjust as necessary
    marginRight: 10, // Adjust as necessary
    // Define shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    // Elevation for Android (will only have effect on Android devices)
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333', // Dark color for text for better readability
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007BFF', // This sets the background color to a blue shade.
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    elevation: 2,
},
  editButtonText: {
    color: 'white', // This sets the text color to white.
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: 'red', // Or any other color that fits your design
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    elevation: 2,
    // alignSelf removed because it's now within a flex row container
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  copyButton: {
    backgroundColor: '#5A67D8', // A color that fits your design
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    elevation: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // This will space out the buttons evenly
    padding: 10,
  },
  button: {
    flex: 1, // Each button will take up equal space
    paddingVertical: 10,
    paddingHorizontal: 12, // Reduced padding
    marginHorizontal: 5, // Added margin between buttons
    borderRadius: 5,
    elevation: 3,
  },
  addPasswordButton: {
    backgroundColor: '#5A67D8',
  },
  toggleButton: {
    backgroundColor: '#5A67D8',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF414D', // A color that signifies action like logout
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 0,
    marginBottom: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default DashboardPasswords;
