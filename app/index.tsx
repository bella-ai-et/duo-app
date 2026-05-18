import { Pressable, Text, View } from "@/components/tw";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-white gap-4 p-6">
      <Text className="text-2xl font-poppins-bold text-lingua-purple">Welcome to Muolingo!</Text>
      <Text className="text-body-large text-text-secondary text-center">
        Hello {user?.emailAddresses[0]?.emailAddress}
      </Text>
      
      <Pressable 
        onPress={() => signOut()}
        className="mt-8 p-4 bg-red-500 rounded-xl w-full items-center"
      >
        <Text className="text-white font-poppins-semibold">Sign Out</Text>
      </Pressable>
    </View>
  );
}
