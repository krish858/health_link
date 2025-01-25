import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { clear, getItem } from "@/scripts/AsyncStorage";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetRecords from "@/scripts/GetRecords";
const getrec = () => {
  const [name, Setname] = React.useState("");

  async function getname() {
    const user = (await AsyncStorage?.getItem("user")) || " ";
    Setname(user);
  }

  React.useEffect(() => {
    getname();
  }, []);

  return (
    <SafeAreaView className="bg-black h-full w-full">
      <View className="flex flex-row items-center justify-between mx-4 mt-4">
        <Text className="text-white text-4xl">welcome back</Text>
        <TouchableOpacity
          onPress={() => {
            clear();
            router.replace("/(auth)/signup");
          }}
        >
          <Text className="text-white bg-blue-500 p-2 rounded-3xl px-3">
            logout
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-3xl text-blue-400 mx-4">{name}</Text>
      <GetRecords />
    </SafeAreaView>
  );
};

export default getrec;
