import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const community = () => {
  const backenuri = Constants.expoConfig?.extra?.backendUrl;
  const { community_id } = useLocalSearchParams();
  const [sender, Setsender] = useState("");
  const [email, Setemail] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Array<Object>>([]);
  const senderstyles = "self-end p-2 bg-slate-300 rounded-3xl mt-4";
  const receiverstyles = "self-start p-2 bg-slate-300 rounded-3xl mt-4 mr-2";

  const scrollViewRef = useRef<ScrollView>(null);

  async function getvars() {
    const Sender = (await AsyncStorage?.getItem("user")) || " ";
    const Email = (await AsyncStorage?.getItem("email")) || " ";
    Setsender(Sender);
    Setemail(Email);
  }

  async function getMessages() {
    try {
      const res = await axios.get(
        `${backenuri}api/v1/community/${community_id}`
      );
      console.log(res.data);
      setChats(res.data.messages);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 10);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getvars();
    getMessages();
  }, []);

  async function sendMessage() {
    try {
      if (message) {
        const res = await axios.post(
          `${backenuri}api/v1/community/${community_id}`,
          {
            message,
            sender,
            email,
          }
        );
        console.log(res.data);
        setMessage("");
        getMessages();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="h-screen w-screen">
      <View className="p-4 flex flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(tabs)/comm");
          }}
        >
          <Text className="text-3xl text-blue-500 font-semibold">{"< "}</Text>
        </TouchableOpacity>
        <Text className="text-2xl">
          {/* @ts-ignore */}
          {community_id}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="w-full h-full">
          <View className="h-[87%] pt-4">
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: false })
              }
            >
              <View className="w-[89%] self-center flex flex-col">
                {chats.map((chat, index) => (
                  <View
                    className={
                      // @ts-ignore
                      chat.email === email ? senderstyles : receiverstyles
                    }
                    key={index}
                  >
                    <Text className="text-lg">
                      {/*@ts-ignore */}
                      {chat.message}
                    </Text>

                    <Text className="text-sm text-white self-end mr-2">
                      {/*@ts-ignore */}
                      {chat.sender}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View>
            <View className="flex flex-row items-center w-[90%] self-center mt-3 rounded-2xl bg-slate-300">
              <TextInput
                className="w-[89%] px-2 py-3"
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Icon name="send" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default community;
