import {Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import DashboardPasswords from "./dashboardPasswords"
import {COLORS, SIZES} from "../constants";
import {Stack} from "expo-router";
import {StatusBar} from "native-base";



export const Dashboard = () =>{
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerShown: false
          }}>
        </Stack.Screen>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightWhite} />
        <View style={{ flex: 1, justifyContent: 'center' }}>

          <DashboardPasswords/>
        </View>
    </SafeAreaView>
    );
}

export default Dashboard;
