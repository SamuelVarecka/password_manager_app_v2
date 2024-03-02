import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

const EditPasswordModal = ({ isVisible, onClose, onSubmit, passwordId }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = () => {
  onSubmit({
    password_id: passwordId,
    new_username: newUsername,
    new_password: newPassword,
  });
  // Resetting the state
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholderTextColor="#888"
            placeholder="Nove Meno"
            value={newUsername}
            onChangeText={setNewUsername}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="#888"
            placeholder="Nove Heslo"
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

export default EditPasswordModal;
