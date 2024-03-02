import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Clipboard,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  const fetchPasswords = useCallback(async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('access_token');
      const username = await AsyncStorage.getItem('username');
      const response = await axios.post('https://hesla.sk/api/view_passwords', { username }, {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });
      setPasswords(Array.isArray(response.data.passwords) ? response.data.passwords : []);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setPasswords([]);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPasswords();
    setRefreshing(false);
  }, [fetchPasswords]);

  const copyToClipboard = (password) => {
    Clipboard.setString(password);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Heslo bolo skopírované!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Heslo bolo skopírované!');
    }
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
      login: passwordData.username,
      password: passwordData.password,
    }, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });

    if (response.data.message === 'Password saved successfully') {
      // Password added successfully, update the displayed passwords
      await fetchPasswords();
    } else {
      console.error('Error adding password:', response.data.message);
    }
  } catch (error) {
    console.error('Error adding password:', error);
  }
};

  const openEditModal = (passwordId) => {
    setSelectedPassword(passwordId);
    setIsEditModalVisible(true); // Open the modal
  };

  const handleEditPassword = async (item) => {
    if (!selectedPassword) return;
    try {
      const jwtToken = await AsyncStorage.getItem('access_token');

      const responce = await axios({
        method: "post",
        url: "https://hesla.sk/api/change_password",
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        },
        data: {
          password_id: selectedPassword,
          new_username: item.new_username,
          new_password: item.new_password,
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
      console.error('Error changing password:', error.response.data);
    } else if (error.request) {
      console.error('Error changing password: No response received:', error.request);
    } else {
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
        password_id: passwordId,
      }
    });

    if (response.data.message === 'Password successfully deleted') {
      // Password deleted successfully, update the displayed passwords
      await fetchPasswords();
    } else {
      console.error('Error deleting password:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error deleting password:', error.response.data);
    } else if (error.request) {
      console.error('Error deleting password: No response received:', error.request);
    } else {
      console.error('Error deleting password:', error.message);
    }
  }
};



  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
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
          <Text style={styles.buttonText}>Pridať heslo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.toggleButton]}
          onPress={toggleAllPasswordsVisibility}
        >
          <Text style={styles.buttonText}>
            {arePasswordsVisible ? "Skry heslá" : "Ukáž heslá"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addPasswordButton]}
          onPress={() => router.push("/profile")}>
          <Text style={styles.buttonText}>Profil</Text>
        </TouchableOpacity>
      </View>
      <View>
        <AddPasswordModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddPassword}
        />
      </View>

      <EditPasswordModal
        isVisible={isEditModalVisible}
        onClose={() => { setIsEditModalVisible(false); setSelectedPassword(null); }}
        onSubmit={handleEditPassword}
        passwordId={selectedPassword}
      />

      <ScrollView refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  } style={styles.passwordList}>
        {passwords.map((item, index) => (
          <View key={item.id || `password-${index}`} style={styles.passwordItem}>
            <Text style={styles.itemText}>
              <Text style={{ fontWeight: 'bold' }}>Platform:</Text> {item.platform}
            </Text>
            <Text style={styles.itemText}>
              <Text style={{ fontWeight: 'bold' }}>Username:</Text> {item.username}
            </Text>
            <Text style={styles.itemText}>
              <Text style={{ fontWeight: 'bold' }}>Password:</Text> {arePasswordsVisible ? item.password : '••••••••'}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.editButton}
              onPress={() => openEditModal(item.password_id)} // Open edit modal with the current item's data
                >
              <Text style={styles.editButtonText}>Upraviť</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard(item.password)}
            >
              <Text style={styles.copyButtonText}>Kopirovať Heslo</Text>
            </TouchableOpacity>
              <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePass(item.password_id)}
            >
              <Text style={styles.deleteButtonText}>Vymazať</Text>
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View>
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
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
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
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordList: {
    margin: 15,
    marginBottom: 60
  },
  passwordItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    // Increase margin to give space for the shadow
    marginLeft: 10,
    marginRight: 10,
    // Define shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    // Elevation for Android
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
  backgroundColor: '#007BFF',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 15,
  elevation: 2,
  justifyContent: 'center',
  alignItems: 'center',
  width: 70,
  height: 40,
},

  editButtonText: {
    color: 'white',
    fontWeight: '500',
  },

  deleteButton: {
    backgroundColor: '#ed0c0c',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
  },

  deleteButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  copyButton: {
  backgroundColor: '#828d9e',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 15,
  elevation: 2,
  justifyContent: 'center',
  alignItems: 'center',
  width: 125,
  height: 40,
},

copyButtonText: {
  color: 'white',
  fontWeight: '500',
},
buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  marginTop: Platform.OS === 'android' ? 40 : 5,
  },
  button: {
    flex: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 15,
    elevation: 3,
    margin: 2,
    minWidth: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPasswordButton: {
    backgroundColor: '#007BFF',
  },
  toggleButton: {
    backgroundColor: '#6c7482',
  },
  profileButton: {
    backgroundColor: '#0056B3',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    position: 'absolute',
  bottom: 5,
  left: 22,
  right: 22,
  backgroundColor: '#FF414D',
  padding: 13,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default DashboardPasswords;
