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
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="aichat"
        options={{
          title: "aichat",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={25}
              name="chatbubble-ellipses-outline"
              color={"#CBD5E1"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="getrec"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={25} color={"#CBD5E1"} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={25} color={"#CBD5E1"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default layout;
