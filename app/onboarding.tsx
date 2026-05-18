import { Pressable, ScrollView, Text, View } from "@/components/tw";
import { Image } from "@/components/tw/image";
import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerClassName="flex-grow items-center justify-between py-12 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Logo */}
        <View className="flex-row items-center gap-2">
          <Image
            source={images.mascotLogo}
            className="w-10 h-10"
            contentFit="contain"
          />
          <Text className="text-2xl font-poppins-bold text-text-primary">
            muolingo
          </Text>
        </View>

        {/* Content Section */}
        <View className="items-center w-full">
          <Text className="text-[32px] font-poppins-bold text-text-primary text-center leading-tight">
            Your AI language{"\n"}
            <Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="text-body-large text-text-secondary text-center mt-4 px-4">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot Image */}
        <View className="w-full aspect-square items-center justify-center relative">
          {/* Speech Bubbles - Mocking them for now if they are part of the image, 
              but looking at the design they seem to be part of the image mascot-welcome. 
              If not, I might need to add them. 
              Let's assume mascot-welcome includes them based on the image name. */}
          <Image
            source={images.mascotWelcome}
            className="w-full h-full"
            contentFit="contain"
          />
        </View>

        {/* Bottom Button */}
        <View className="w-full">
          <Pressable
            onPress={handleGetStarted}
            className="bg-lingua-purple h-[64px] rounded-2xl flex-row items-center justify-center relative"
            style={({ pressed }) => ({
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text className="text-white text-lg font-poppins-semibold">
              Get Started
            </Text>
            <View className="absolute right-6">
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
