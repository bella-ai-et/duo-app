import { Pressable, ScrollView, Text, TextInput, View } from "@/components/tw";
import { Image } from "@/components/tw/image";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Helper to get mock learner counts to match design style
const getLearnerCount = (langId: string) => {
  const counts: Record<string, string> = {
    spanish: "28.4M learners",
    french: "19.4M learners",
    japanese: "12.7M learners",
    italian: "11.2M learners",
    german: "8.1M learners",
  };
  return counts[langId] || "5.0M learners";
};

export default function ChooseLanguage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4">
          <Pressable onPress={() => router.back()} className="p-2">
            <Ionicons name="chevron-back" size={24} color="#0d132b" />
          </Pressable>
          <View className="flex-1 items-center mr-8">
            <Text className="text-h3">Choose a language</Text>
          </View>
        </View>

        <ScrollView 
          className="flex-1" 
          contentContainerClassName="px-4 pb-80"
          showsVerticalScrollIndicator={false}
        >
          {/* Search Bar */}
          <View className="flex-row items-center bg-surface rounded-full px-4 py-3 mb-6">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              placeholder="Search languages"
              placeholderTextColor="#6b7280"
              className="flex-1 ml-2 text-body-medium"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Section Title */}
          <Text className="text-h4 mb-4">Popular</Text>

          {/* Language List */}
          <View className="gap-3">
            {filteredLanguages.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <Pressable
                  key={lang.id}
                  onPress={() => setSelectedLanguage(lang.id)}
                  className={`flex-row items-center p-4 rounded-2xl border-2 ${
                    isSelected ? "border-lingua-purple bg-lingua-purple/5" : "border-gray-100"
                  }`}
                >
                  <View className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100">
                    <Image
                      source={lang.flag}
                      className="w-full h-full"
                      contentFit="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-h4">{lang.name}</Text>
                    <Text className="text-body-small">
                      {getLearnerCount(lang.id)}
                    </Text>
                  </View>
                  {isSelected ? (
                    <View className="bg-lingua-purple rounded-full p-1">
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Confirmation Button */}
          {selectedLanguage && (
            <Pressable
              onPress={() => router.push("/")}
              className="mt-8 bg-lingua-purple p-4 rounded-2xl items-center shadow-soft"
            >
              <Text className="text-white font-poppins-semibold text-[16px]">Continue</Text>
            </Pressable>
          )}
        </ScrollView>

        {/* Earth Image at the bottom */}
        <View className="absolute bottom-0 left-0 right-0 pointer-events-none items-center">
          <Image
            source={images.earth}
            style={{ width: '100%', height: 320 }}
            contentFit="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
