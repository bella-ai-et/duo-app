import { Text, View, Link } from "@/components/tw";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-white gap-4">
      <Text className="text-2xl font-bold text-indigo-600">duo</Text>
      <Link href="/onboarding" className="p-4 bg-lingua-purple rounded-xl">
        <Text className="text-white font-semibold">Open Onboarding</Text>
      </Link>
    </View>
  );
}
