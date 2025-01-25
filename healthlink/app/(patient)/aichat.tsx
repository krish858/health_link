mport React, { useState } from "react";
import {View,TextInput,TouchableOpacity,Text,FlatList,StyleSheet,SafeAreaView,Platform,StatusBar,
} from "react-native";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: Hello! This is your virtual health assistant. How can I help you today?,
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");

    try {
      const chatHistory = messages
        .map(
          (msg) => ${msg.sender === "user" ? "User: " : "Bot: "}${msg.text}
        )
        .join("\n");

      const fullChatHistory = ${chatHistory}\nUser: ${newMessage.text};

      const response = await axios.post(
        "https://backend-7306.onrender.com/api/v1/ai/chat",
        {
          chats: fullChatHistory,
        }
      );

      const botMessage = {
        id: Date.now(),
        text: response.data.aiResponse,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now(),
        text: "Sorry, something went wrong.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inner: {
    flex: 1,
    paddingTop: 20,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userMessage: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#007bff",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Chat;
