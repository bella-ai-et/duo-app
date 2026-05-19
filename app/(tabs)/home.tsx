import { Pressable, ScrollView, Text, View } from "@/components/tw";
import { Image } from "@/components/tw/image";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguageId } = useLanguageStore();
  const router = useRouter();

  const selectedLanguage = useMemo(() => {
    return languages.find((l) => l.id === selectedLanguageId) || languages[0];
  }, [selectedLanguageId]);

  const greeting = useMemo(() => {
    const greetings: Record<string, string> = {
      es: "Hola",
      fr: "Bonjour",
      it: "Ciao",
      de: "Hallo",
      ja: "Konnichiwa",
    };
    return greetings[selectedLanguage.code] || "Hello";
  }, [selectedLanguage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                source={selectedLanguage.flag}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
            <Text className="text-h3 text-text-primary">
              {greeting}, {user?.firstName || "Alex"}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Image source={images.streakFire} className="w-6 h-6" contentFit="contain" />
              <Text className="ml-1.5 font-poppins-bold text-[18px] text-text-secondary">12</Text>
            </View>
            <Pressable className="p-1">
              <Ionicons name="notifications-outline" size={24} color="#0d132b" />
            </Pressable>
          </View>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Daily Goal Card */}
          <View className="mx-6 mt-2 mb-6 bg-[#fff9f2] rounded-[32px] p-6 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-text-secondary font-poppins-medium text-[14px] mb-2">Daily goal</Text>
              <View className="flex-row items-baseline mb-4">
                <Text className="text-[28px] font-poppins-bold text-text-primary">15</Text>
                <Text className="text-[18px] font-poppins-medium text-text-secondary ml-1">/ 20 XP</Text>
              </View>
              <View className="h-2.5 bg-[#ffebd6] rounded-full overflow-hidden w-[160px]">
                <View className="h-full bg-streak w-[75%] rounded-full" />
              </View>
            </View>
            <Image source={images.treasure} className="w-24 h-24" contentFit="contain" />
          </View>

          {/* Continue Learning Card */}
          <View className="mx-6 mb-8 bg-lingua-purple rounded-[32px] p-6 relative overflow-hidden h-[180px]">
            <View className="z-10 flex-1 justify-between">
              <View>
                <Text className="text-white/80 font-poppins-medium text-[14px]">Continue learning</Text>
                <Text className="text-white text-[28px] font-poppins-bold mt-1">
                  {selectedLanguage.name}
                </Text>
                <Text className="text-white/80 font-poppins-medium text-[14px]">A1 • Unit 3</Text>
              </View>
              <Pressable 
                className="bg-white px-6 py-2.5 rounded-2xl self-start mt-4"
                onPress={() => router.push("/learn")}
              >
                <Text className="text-lingua-purple font-poppins-bold text-[14px]">Continue</Text>
              </Pressable>
            </View>
            <Image 
              source={images.palace} 
              className="absolute -right-2 -bottom-2 w-[160px] h-[160px] opacity-90" 
              contentFit="contain" 
            />
          </View>

          {/* Today's Plan Section */}
          <View className="px-6 mb-8">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-h3 text-text-primary">Today{"'"}s plan</Text>
              <Pressable onPress={() => {}}>
                <Text className="text-lingua-purple font-poppins-bold text-[14px]">View all</Text>
              </Pressable>
            </View>

            <View className="gap-6">
              {/* Lesson Item */}
              <View className="flex-row items-center">
                <View className="w-14 h-14 bg-lingua-purple rounded-[18px] items-center justify-center mr-4">
                  <Ionicons name="book" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="font-poppins-bold text-[16px] text-text-primary">Lesson</Text>
                  <Text className="text-text-secondary text-[14px]">At the café</Text>
                </View>
                <View className="w-6 h-6 rounded-full bg-lingua-purple items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              </View>

              {/* AI Conversation Item */}
              <View className="flex-row items-center">
                <View className="w-14 h-14 bg-lingua-purple rounded-[18px] items-center justify-center mr-4">
                  <Ionicons name="headset" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="font-poppins-bold text-[16px] text-text-primary">AI Conversation</Text>
                  <Text className="text-text-secondary text-[14px]">Talk about your day</Text>
                </View>
                <View className="w-6 h-6 rounded-full border-2 border-gray-200" />
              </View>

              {/* New Words Item */}
              <View className="flex-row items-center">
                <View className="w-14 h-14 bg-[#ff6b6b] rounded-[18px] items-center justify-center mr-4">
                  <Ionicons name="chatbubble-ellipses" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="font-poppins-bold text-[16px] text-text-primary">New words</Text>
                  <Text className="text-text-secondary text-[14px]">10 words</Text>
                </View>
                <View className="w-6 h-6 rounded-full border-2 border-gray-200" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
