import {SafeAreaView, ScrollView, View} from "react-native";
import {Stack} from "expo-router";
import {COLORS} from "../constants";
import HomePage from "./homepage";


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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <HomePage/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;