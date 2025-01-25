import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { router } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import signupimg from "@/assets/images/signup.png";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signup = () => {
  const backenuri = Constants.expoConfig?.extra?.backendUrl;
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("This should be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
  });

  async function signupUser(username: string, email: string, password: string) {
    try {
      const res = await axios.post(`${backenuri}api/v1/auth/signup`, {
        fullname: username,
        email,
        password,
      });
      console.log(res.data);
      if (res.data.msg === "User already exists") {
        console.log("User already exists");
      }
      if (res.data.msg === "success") {
        console.log("User already exists");
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("user", username);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("designation", "patient");
        router.replace("/(patient)/getrec");
      } else {
        console.log("some error occoured");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="flex-1 px-6 py-10 justify-center bg-black">
      <Image source={signupimg} className="w-[80%] h-[40%] self-center" />
      <Text className="text-white text-center text-3xl font-bold mb-6">
        Sign Up
      </Text>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          const { username, email, password } = values;
          signupUser(username, email, password);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View className="mb-4">
              <Text className="text-gray-400 mb-2">Username</Text>
              <TextInput
                className="text-gray-800 bg-white p-3 rounded-lg"
                placeholder="Enter your username"
                placeholderTextColor="#7f8c8d"
                value={values.username}
                onBlur={handleBlur("username")}
                onChangeText={handleChange("username")}
              />
              {errors.username && touched.username && (
                <Text className="text-red-500">{errors.username}</Text>
              )}
            </View>
            <View className="mb-4">
              <Text className="text-gray-400 mb-2">Email</Text>
              <TextInput
                className="text-gray-800 bg-white p-3 rounded-lg"
                placeholder="Enter your email"
                placeholderTextColor="#7f8c8d"
                keyboardType="email-address"
                value={values.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />
              {errors.email && touched.email && (
                <Text className="text-red-500">{errors.email}</Text>
              )}
            </View>
            <View className="mb-6">
              <Text className="text-gray-400 mb-2">Password</Text>
              <TextInput
                className="text-gray-800 bg-white p-3 rounded-lg"
                placeholder="Enter your password"
                placeholderTextColor="#7f8c8d"
                secureTextEntry
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              className="bg-blue-600 p-3 rounded-lg mb-4"
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text className="text-white text-center font-semibold">Next</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4">
              <Text className="text-slate-300">Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  router.replace("/(auth)/signin");
                }}
              >
                <Text className="text-blue-400">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default signup;
