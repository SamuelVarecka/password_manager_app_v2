import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import LoginForm from './LoginForm';
import {COLORS, SIZES} from "../../constants";
import {Stack} from "expo-router"; // Adjust the import path as needed

export const LoginScreen = () => {
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
          <LoginForm/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
