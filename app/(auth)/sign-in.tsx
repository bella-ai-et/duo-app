import { Pressable, ScrollView, Text, TextInput, View } from "@/components/tw";
import { Image } from "@/components/tw/image";
import { images } from "@/constants/images";
import { useSignIn, useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleSignIn = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      Alert.alert("Sign In Error", error.message || "Something went wrong");
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl('/')
          router.push(url as Href)
        },
      })
    } else if (signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust') {
      await signIn.mfa.sendEmailCode();
      setShowVerification(true);
    }
  };

  const onSocialPress = useCallback(async (strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("/", { scheme: "duo54" }),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      console.error("OAuth error", err);
      Alert.alert("Authentication Error", err.errors?.[0]?.message || "Failed to sign in with social provider.");
    }
  }, [startSSOFlow]);

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl('/')
          router.push(url as Href)
        },
      })
    } else {
      Alert.alert("Verification Error", "Sign-in attempt not complete");
    }
  };

  const handleCodeChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 6) {
      setCode(cleaned);
      if (cleaned.length === 6) {
        handleVerify();
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 pb-12"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center -ml-2 mt-2"
          >
            <Ionicons name="chevron-back" size={28} color="#0d132b" />
          </Pressable>

          {/* Header */}
          <View className="mt-4">
            <Text className="text-h1">Welcome back</Text>
            <Text className="text-body-large text-text-secondary mt-2">
              Log in to your account
            </Text>
          </View>

          {/* Mascot */}
          <View className="items-center justify-center my-6">
            <Image
              source={images.mascotAuth}
              className="w-40 h-40"
              contentFit="contain"
            />
          </View>

          {/* Inputs */}
          <View className="gap-4">
            <View>
              <Text className="text-caption mb-1 ml-1">Email</Text>
              <View className="h-[64px] bg-white border border-border rounded-2xl px-4 flex-row items-center">
                <TextInput
                  placeholder="alex@gmail.com"
                  placeholderTextColor="#6b7280"
                  className="flex-1 text-body-large"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View>
              <Text className="text-caption mb-1 ml-1">Password</Text>
              <View className="h-[64px] bg-white border border-border rounded-2xl px-4 flex-row items-center">
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  className="flex-1 text-body-large"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#6b7280"
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Sign In Button */}
          <Pressable
            onPress={handleSignIn}
            disabled={fetchStatus === 'fetching' || !email || !password}
            className={`bg-lingua-purple h-[64px] rounded-2xl items-center justify-center mt-8 ${
              fetchStatus === 'fetching' || !email || !password ? "opacity-50" : ""
            }`}
            style={({ pressed }) => ({
              opacity: pressed ? 0.9 : (fetchStatus === 'fetching' || !email || !password ? 0.5 : 1),
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text className="text-white text-lg font-poppins-semibold">
              {fetchStatus === 'fetching' ? "Logging in..." : "Sign In"}
            </Text>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="mx-4 text-body-small">or continue with</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          {/* Social Buttons */}
          <View className="gap-4">
            <SocialButton
              icon="logo-google"
              label="Continue with Google"
              color="#EA4335"
              onPress={() => onSocialPress("oauth_google")}
            />
            <SocialButton
              icon="logo-facebook"
              label="Continue with Facebook"
              color="#1877F2"
              onPress={() => onSocialPress("oauth_facebook")}
            />
            <SocialButton
              icon="logo-apple"
              label="Continue with Apple"
              color="#000000"
              onPress={() => onSocialPress("oauth_apple")}
            />
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-10">
            <Text className="text-body-medium text-text-secondary">
              Don&apos;t have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/sign-up")}>
              <Text className="text-body-medium font-poppins-semibold text-lingua-purple">
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Modal */}
      <Modal
        visible={showVerification}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVerification(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white w-full rounded-3xl p-8 items-center shadow-lg">
            <View className="w-16 h-16 bg-lingua-purple/10 rounded-full items-center justify-center mb-6">
              <Ionicons name="mail-outline" size={32} color="#6c4ef5" />
            </View>
            <Text className="text-h2 text-center">Check your email</Text>
            <Text className="text-body-medium text-text-secondary text-center mt-2 mb-8">
              We&apos;ve sent a 6-digit verification code to your email address.
            </Text>

            <View className="flex-row gap-2 mb-8">
              {[...Array(6)].map((_, i) => (
                <View
                  key={i}
                  className={`w-10 h-14 border-2 rounded-xl items-center justify-center ${
                    code.length === i ? "border-lingua-purple" : "border-border"
                  }`}
                >
                  <Text className="text-h3">
                    {code[i] || ""}
                  </Text>
                </View>
              ))}
            </View>

            <TextInput
              autoFocus
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={handleCodeChange}
              style={{ position: "absolute", opacity: 0 }}
            />

            <Pressable
              onPress={() => {
                setShowVerification(false);
                signIn.mfa.sendEmailCode();
              }}
              className="mt-4"
            >
              <Text className="text-body-medium text-text-secondary">
                Didn&apos;t receive code? <Text className="text-lingua-purple font-poppins-semibold">Resend</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[64px] border border-border rounded-2xl flex-row items-center px-6 relative"
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#f9fafb" : "white",
      })}
    >
      <View className="absolute left-6">
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text className="flex-1 text-center text-body-large font-poppins-medium">
        {label}
      </Text>
    </Pressable>
  );
}
