import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator
      size="large"
      color="black"
      style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Loader;
