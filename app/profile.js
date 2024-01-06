import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {COLORS, SIZES} from "../constants";
import {Stack} from "expo-router";



export const Profile = () =>{
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerShown: false
          }}>
        </Stack.Screen>
        <ScrollView>
          <View style={{ flex: 1, padding: SIZES.medium, justifyContent: 'center' }}>
            <Text>Uzivatelsky Profil</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
    );
}

export default Profile;