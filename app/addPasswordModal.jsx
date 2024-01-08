import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

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
    // Clear the inputs
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust the value as needed for Android
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Platforma"
            placeholderTextColor="#888"
            value={newPlatform}
            onChangeText={setNewPlatform}
            style={styles.input}
          />
          <TextInput
            placeholder="Meno"
            placeholderTextColor="#888"
            value={newUsername}
            onChangeText={setNewUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Heslo"
            placeholderTextColor="#888"
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
      </KeyboardAvoidingView>
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
    width: '90%',
    height: '50%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: 'black',
    fontSize: 16,
    backgroundColor: 'white',
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
