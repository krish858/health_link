import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

import { useColorScheme } from "@/hooks/useColorScheme";

const layout = () => {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="createrec"
        options={{
          title: "createrec",
          tabBarIcon: ({ color }) => (
            <Ionicons size={25} name="home-outline" color={"#CBD5E1"} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "wallet",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={25} color={"#CBD5E1"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default layout;
