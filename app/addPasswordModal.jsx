import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AddPasswordModal = ({ isVisible, onClose, onSubmit }) => {
  const [newPlatform, setNewPlatform] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({
      platform: newPlatform,
      username: newUsername,
      password: newPassword,
    });
    setNewPlatform('');
    setNewUsername('');
    setNewPassword('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            placeholderTextColor={styles.input.placeholderTextColor}
            placeholder="Platforma"
            value={newPlatform}
            onChangeText={setNewPlatform}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor={styles.input.placeholderTextColor}
            placeholder="Meno"
            value={newUsername}
            onChangeText={setNewUsername}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor={styles.input.placeholderTextColor}
            placeholder="Heslo"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} color="#5A67D8" />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '90%', // Set the width of the modal
    height: '50%', // Set the height of the modal
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center', // Center the content vertically
  },
  input: {
    width: '100%', // Full width of the modal
    marginBottom: 15, // Space at the bottom
    paddingHorizontal: 10, // Horizontal padding
    paddingVertical: 8, // Vertical padding
    borderWidth: 1, // Width of the border
    borderColor: '#ddd', // Color of the border
    borderRadius: 6, // Rounded corners
    color: 'black', // Text color
    placeholderTextColor: '#888', // A lighter shade for placeholder text
    fontSize: 16, // Size of the text
    backgroundColor: 'white', // Background color of the input
  },
  closeButton: {
    backgroundColor: '#FF414D',
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddPasswordModal;
