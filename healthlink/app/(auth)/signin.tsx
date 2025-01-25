import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import signinimg from "@/assets/images/signin.png";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { router } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import JWT from "expo-jwt";

import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signin = () => {
  const backenuri = Constants.expoConfig?.extra?.backendUrl;
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("This should be an valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
  });

  async function signinUser(email: string, password: string) {
    console.log(email, password);
    try {
      const response = await axios.post(`${backenuri}api/v1/auth/signin`, {
        email,
        password,
      });
      if (response.data.message === "Invalid email") {
        console.log("Invalid email");
      }
      if (response.data.message === "Invalid password") {
        console.log("Invalid password");
      }
      if (response.data.msg == "success") {
        console.log("Sign-in successful");
        await AsyncStorage.setItem("token", response.data.token);
        const decoded = await JWT.decode(response.data.token, "hello_man123");
        const username = await decoded?.fullname;
        await AsyncStorage.setItem("user", username || "");
        AsyncStorage.setItem("email", response.data.email);
        console.log(response.data.designation);

        if (response.data.designation == "doctor") {
          await router.replace("/(doctor)/createrec");
        } else {
          await router.replace("/(patient)/getrec");
        }
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="flex-1 px-6 py-10 justify-center bg-black">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image
            source={signinimg}
            className="w-[80%] h-[40%] self-center mb-10"
          />
          <Text className="text-white text-3xl font-bold mb-6 text-center">
            Sign In
          </Text>
          <View className="mb-4">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                const { email, password } = values;
                signinUser(email, password);
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
                <View className="mb-4">
                  <View className="mb-6">
                    <Text className="text-gray-400 mb-2">Email</Text>
                    <TextInput
                      className="text-gray-800 bg-white p-3 rounded-lg"
                      placeholder="Enter your email"
                      placeholderTextColor="#7f8c8d"
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
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
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
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
                    <Text className="text-white text-center font-semibold">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <View className="flex-row justify-center mt-4">
                    <Text className="text-slate-300">
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        router.replace("/(auth)/signup");
                      }}
                    >
                      <Text className="text-blue-400">Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default signin;
