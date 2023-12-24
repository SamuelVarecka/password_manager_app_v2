import { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Link, useRouter, Stack } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {LoginScreen} from "./LoginScreen"



const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: ""
          }}
      >

      </Stack.Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, justifyContent: 'center' }}>
          <LoginScreen/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;