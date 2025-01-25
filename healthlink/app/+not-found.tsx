import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="h-full w-full bg-black flex justify-center">
      <View>
        <Text className="text-slate-400 text-4xl text-center">
          Page not found
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.replace("/");
          }}
        >
          <Text className="text-blue-500 text-xxl text-center">
            Click here to go to home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
