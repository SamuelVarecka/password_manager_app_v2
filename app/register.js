import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {COLORS, SIZES} from "../constants";
import RegisterForm from "./RegisterForm";
import {Stack} from "expo-router"; // Adjust the import path as needed

export const Register = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
      options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: ""
          }}>
      </Stack.Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, justifyContent: 'center' }}>
          <RegisterForm/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
