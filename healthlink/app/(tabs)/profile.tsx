import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Line = () => {
  return <View className="border-[0.7px] border-[#dadada] m-2"></View>;
};

const profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  async function getvars() {
    const User = (await AsyncStorage?.getItem("user")) || " ";
    const Email = (await AsyncStorage?.getItem("email")) || " ";
    setUser(User);
    setEmail(Email);
  }

  useEffect(() => {
    getvars();
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen bg-[#ffffff]">
      <View className="h-full w-full ">
        <View className="h-[87%] w-full">
          <Text className="text-center mt-8 text-xl font-semibold">
            Settings
          </Text>
          <View className="flex justify-center items-center">
            <View className="bg-green-500 flex w-[60] h-[60] justify-center items-center rounded-full mt-10">
              <Text className="text-center text-4xl text-white font-semibold">
                B
              </Text>
            </View>
            <Text className="mt-2">
              {/* @ts-ignore */}
              {user}
            </Text>
            <Text className="text-slate-400 font-light">
              {/* @ts-ignore */}
              {email}
            </Text>
          </View>
          <View className="bg-[#f3f3f3] w-[85%] ml-6 mt-10 p-2 rounded-2xl">
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <Text className="text-[#848484] text-lg">Personal Details</Text>
              </View>
              <View className="mr-2">
                <Icon name="arrow-forward" size={16} color={"#848484"} />
              </View>
            </View>
            <Line />
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <Text className="text-[#848484] text-lg">Health Details</Text>
              </View>
              <View className="mr-2">
                <Icon name="arrow-forward" size={16} color={"#848484"} />
              </View>
            </View>
            <Line />
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <Text className="text-[#848484] text-lg">
                  Emergency Contacts
                </Text>
              </View>
              <View className="mr-2">
                <Icon name="arrow-forward" size={16} color={"#848484"} />
              </View>
            </View>
          </View>
          <View className="bg-[#f3f3f3] w-[85%] ml-6 mt-10 p-2 rounded-2xl">
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <Text className="text-[#848484] text-lg">Daily Routine</Text>
              </View>
              <View className="mr-2">
                <Icon name="arrow-forward" size={16} color={"#848484"} />
              </View>
            </View>
            <Line />
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <Text className="text-[#848484] text-lg">Medicine Routine</Text>
              </View>
              <View className="mr-2">
                <Icon name="arrow-forward" size={16} color={"#848484"} />
              </View>
            </View>
            <Line />
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <Text className="text-[#848484] text-lg">
                  Reminder Notifications
                </Text>
              </View>
              <View className="">
                <Switch
                  trackColor={{
                    false: "#767577",
                    true: "#22c55e",
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setIsEnabled(!isEnabled)}
                  value={isEnabled}
                />
              </View>
            </View>
            <Line />
            <View className="flex flex-row w-full items-center justify-between">
              <View>
                <TouchableOpacity
                  onPress={() => {
                    AsyncStorage.clear();
                    router.replace("/(auth)/signup");
                  }}
                >
                  <Text className="text-red-500 text-lg">Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="flex justify-center items-center h-[13%] bg-[#ffffff]">
          <View className="flex flex-row items-center justify-around bg-[#f3f3f3] h-[60%] w-[89%] self-center rounded-3xl">
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/comm");
              }}
            >
              <Text>Comm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/home");
              }}
            >
              <Text>home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/chat");
              }}
            >
              <Text>Chat</Text>
            </TouchableOpacity>
            <Text>profile</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default profile;
