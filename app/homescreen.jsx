import React, {useEffect} from 'react';
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from "expo-router";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {COLORS} from "../constants";

const Homep = () => {
  const router = useRouter();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.fadingContainer, animatedStyles]}>
        <Text style={styles.fadingText}>Vitajte v Manažéri Hesiel</Text>
      </Animated.View>
      <Image
        source={require('./img.png')}
        style={styles.imageStyle}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => router.push("/Login/LoginScreen")} style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>Prihlásiť sa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Register/register")} style={[styles.button, styles.signUpButton]}>
          <Text style={styles.buttonText}>Zaregistrovať sa</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.linkContainer} onPress={() => Linking.openURL('https://www.hesla.sk/')}>
          <Text style={styles.linkText}>Viac o manažérovi hesiel tu...</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightWhite,
    paddingTop: 10,
    marginTop: 20,
  },
  fadingContainer: {
    borderRadius: 20,
    padding: 20,
  },
  fadingText: {
    fontSize: 36,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 25,
    elevation: 2,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#007BFF',
  },
  signUpButton: {
    backgroundColor: '#0056B3',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
   linkContainer: {
    marginTop: 30,
  },
  linkText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },

});

export default Homep;
