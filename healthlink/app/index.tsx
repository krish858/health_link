import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  async function routing() {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/(auth)/signup");
      return;
    }
    router.replace("/(patient)/getrec");
  }
  useEffect(() => {
    routing();
  }, []);
  return <SafeAreaView></SafeAreaView>;
};

export default index;
