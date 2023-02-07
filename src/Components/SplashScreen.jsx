import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import splash from "../../assets/splash.png";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splash} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginTop: 40,
  },
});

export default SplashScreen;
