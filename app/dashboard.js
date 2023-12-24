import {SafeAreaView, ScrollView, Text, View} from "react-native";
import { DashboardPasswords } from "./dashboardPasswords"
import {COLORS, SIZES} from "../constants";



export const Dashboard = () =>{
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, justifyContent: 'center' }}>
          <DashboardPasswords/>
        </View>
      </ScrollView>
    </SafeAreaView>
    );
}

export default Dashboard;
