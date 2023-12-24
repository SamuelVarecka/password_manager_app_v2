import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import LoginForm from './LoginForm';
import {COLORS, SIZES} from "../constants";
import {Link} from "expo-router"; // Adjust the import path as needed

export const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, justifyContent: 'center' }}>
          <LoginForm/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
