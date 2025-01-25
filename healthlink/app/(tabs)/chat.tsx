import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

const chat = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! I'm Gemini, your chatbot.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const geminiAPI = `${Constants.expoConfig?.extra?.backendUrl}/api/v1/users/gemini`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(`${geminiAPI}/chat`, {
        q: input,
      });
      const botMessage = {
        id: Date.now().toString(),
        text: response.data.answer || "Sorry, I didn't get that.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        text: "There was an error reaching the chatbot.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  //@ts-ignore
  const renderMessage = ({ item }) => (
    <View
      style={{
        alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
        backgroundColor: item.sender === "user" ? "#4caf50" : "#e0e0e0",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: "75%",
      }}
    >
      <Text style={{ color: item.sender === "user" ? "#fff" : "#000" }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="p-4 flex flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/comm");
              }}
            >
              <Text className="text-3xl text-blue-500 font-semibold">
                {"< "}
              </Text>
            </TouchableOpacity>
            <Text className="text-2xl">Chat</Text>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 10 }}
          />
          <View
            className="items-center"
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#fff",
            }}
          >
            <TextInput
              style={{
                flex: 1,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 10,
                height: 40,
              }}
              placeholder="Type a message..."
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
              <Icon name="send" size={24} color="#4caf50" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default chat;
