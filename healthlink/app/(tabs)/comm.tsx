import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Constants from "expo-constants";
import { ScrollView } from "react-native";
import axios from "axios";

const comm = () => {
  const backenuri = Constants.expoConfig?.extra?.backendUrl;
  const [communitiesarr, setCommunitiesarr] = useState([]);

  async function getCommunities() {
    try {
      console.log(backenuri);
      const res = await axios.get(`${backenuri}api/v1/community/`);
      setCommunitiesarr(res.data.community);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen bg-[#ffffff]">
      <View className="h-full w-full ">
        <View className="h-[87%] w-full">
          <Text className="text-4xl p-4 mt-6 font-semibold  ">Communities</Text>
          <ScrollView className="w-full h-full">
            <View className="w-[85%] h-full self-center mt-10 gap-y-6">
              {communitiesarr.map((community, index) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/community",
                      // @ts-ignore
                      params: { community_id: community.community_name },
                    });
                  }}
                >
                  <View
                    key={index}
                    className="flex flex-col p-4 bg-blue-500 rounded-3xl"
                  >
                    <Text className="text-3xl font-semibold text-white">
                      {/* @ts-ignore */}
                      {community.community_name}
                    </Text>

                    <Text className="text-slate-300 mt-4">
                      {/* @ts-ignore */}
                      {community.community_description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="flex justify-center items-center h-[13%] bg-[#ffffff]">
          <View className="flex flex-row items-center justify-around bg-[#f3f3f3] h-[60%] w-[89%] self-center rounded-3xl">
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/comm");
              }}
            >
              <Text>Community</Text>
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

export default comm;
