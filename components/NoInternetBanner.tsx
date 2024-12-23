import React from "react";
import { Text, StyleSheet } from "react-native";
import { useNetwork } from "../context/NetworkProvider";
import * as AnimaTable from 'react-native-animatable'

const NoInternetBanner = () => {
  const isConnected = useNetwork();

  if (isConnected) return null; 

  return (
    <AnimaTable.View 
        style={styles.banner}
        animation="slideInDown"
        duration={500}
    >
      <Text style={styles.text}>No Internet Connection</Text>
    </AnimaTable.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    zIndex: 1000,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default NoInternetBanner;
