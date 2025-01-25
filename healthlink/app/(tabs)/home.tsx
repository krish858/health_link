import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const home = () => {
  const [name, Setname] = React.useState("");

  async function getname() {
    const user = (await AsyncStorage?.getItem("user")) || " ";
    Setname(user);
  }

  React.useEffect(() => {
    getname();
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen">
      <View className="h-full w-full ">
        <View className="h-[87%]">
          <Text className="text-3xl p-4 mt-8 ml-2 font-semibold">
            Welocme back {`${name}`}
          </Text>
          <View className="flex flex-row justify-center items-center bg-[#d1e4e2] mt-2 self-center w-[85%] h-[27%] rounded-xl">
            <View className="w-1/2 h-full flex justify-center items-center">
              <Text className="text-5xl font-semibold text-center">90%</Text>
              <Text className="text-xl font-medium text-center">Completed</Text>
            </View>
            <View className="w-1/2 flex h-full justify-center items-center">
              <View className="rounded-full bg-[#ffffff] h-[115px] w-[115px] flex justify-center items-center p-8 border-8 border-[#b3d3d0]">
                <Text className="text-center text-xl font-semibold">3165</Text>
                <Text className="text-center text-[12px] font-semibold text-slate-400">
                  Steps Left
                </Text>
              </View>
            </View>
          </View>
          <View className="w-[85%] h-[10%] bg-[#d0e0df] rounded-xl self-center mt-6 flex justify-center px-4">
            <Text className="text-2xl font-semibold">Next Medication</Text>
            <Text className="text-xl font-medium text-white">
              10:45 am --- lisinopirl
            </Text>
          </View>
          <View className="flex flex-row w-[85%] h-[36%] mt-6 self-center">
            <View className="w-[58%] h-full">
              <View className="mr-2 my-2 h-full bg-[#dfd1e8] rounded-xl pt-2 pl-2">
                <Text className="text-2xl font-semibold">Routine</Text>
                <Text className="text-white">
                  <Text className="text-xl font-semibold">Morning:</Text> 6:45
                  am --- wake up
                </Text>
                <Text className="text-white">
                  <Text className="text-xl font-semibold">Morning:</Text> 10:45
                  am --- lisinopirl
                </Text>
                <Text className="text-white">
                  <Text className="text-xl font-semibold">Morning:</Text> 11:00
                  am --- fishing
                </Text>
              </View>
            </View>
            <View className="w-[42%]">
              <View className="my-2 mr-2 p-2 bg-[#d9e8cb] rounded-xl">
                <Text className="text-lg text-[#9dadac]">Age</Text>
                <Text className="text-4xl pl-2 text-white font-bold">74</Text>
              </View>
              <View className="my-2 mr-2 p-2 bg-[#f5e4dc] rounded-xl">
                <Text className="text-lg text-[#9dadac]">BMI</Text>
                <Text className="text-4xl pl-2 text-white font-bold">22.1</Text>
                <Text className="font-light text-[#9dadac]">underwieght</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex justify-center items-center h-[13%]">
          <View className="flex flex-row items-center justify-around bg-white h-[60%] w-[89%] self-center rounded-3xl">
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/comm");
              }}
            >
              <Text>community</Text>
            </TouchableOpacity>

            <Text>home</Text>

            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/chat");
              }}
            >
              <Text>chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/profile");
              }}
            >
              <Text>profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;
