import { Pressable, Text, View } from "@/components/tw";
import { Image } from "@/components/tw/image";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { selectedLanguageId, clearLanguage, isHydrated } = useLanguageStore();
  const router = useRouter();

  if (!isLoaded || !isHydrated) return null;

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/choose-language" />;
  }

  return <Redirect href="/home" />;
}
