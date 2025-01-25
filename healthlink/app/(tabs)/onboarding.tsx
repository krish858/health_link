import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const backendUri = Constants.expoConfig?.extra?.backendUrl;

  // Form State
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [email, SetEmail] = useState("");

  // Handle Form Submission

  async function name() {
    const Email = (await AsyncStorage?.getItem("email")) || " ";
    SetEmail(Email);
  }

  const handleSubmit = async () => {
    if (!gender || !age || !height || !weight || !emergencyContact) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUri}api/v1/users/onboarding`,
        {
          gender,
          age,
          height,
          weight,
          emergency_contact: emergencyContact,
          email,
        }
      );

      Alert.alert("Success", "Your details have been updated!");
      router.replace("/(tabs)/home"); // Navigate to home or desired page
    } catch (error) {
      Alert.alert(
        "Error",
        //@ts-ignore
        error.response?.data?.msg || "Something went wrong."
      );
    }
  };

  return (
    <SafeAreaView className="h-screen w-screen bg-white flex justify-center items-center">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="p-4">
          <Text className="text-2xl font-bold text-center mb-6">
            Onboarding
          </Text>

          {/* Gender Input */}
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />

          {/* Age Input */}
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
          />

          {/* Height Input */}
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Height (e.g., 170 cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={(text) => setHeight(text)}
          />

          {/* Weight Input */}
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Weight (e.g., 65 kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />

          {/* Emergency Contact Input */}
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-6"
            placeholder="Emergency Contact (Phone Number)"
            keyboardType="phone-pad"
            value={emergencyContact}
            onChangeText={(text) => setEmergencyContact(text)}
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Onboarding;
