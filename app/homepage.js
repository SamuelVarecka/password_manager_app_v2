import React from 'react';
import {SafeAreaView} from 'react-native';
import {Stack} from "expo-router";
import {COLORS} from "../constants";
import Homep from "./homescreen";

const HomePage = () => {

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: ""
          }}
      >
        </Stack.Screen>
        <Homep/>
      </SafeAreaView>
  );
};



export default HomePage;
