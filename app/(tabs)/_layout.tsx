import { AnimatedView, Pressable, Text, View } from "@/components/tw";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const TAB_WIDTH = width / state.routes.length;
  
  const translateX = useSharedValue(state.index * TAB_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [state.index, TAB_WIDTH]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: TAB_WIDTH,
  }));

  return (
    <View 
      style={{ 
        paddingBottom: insets.bottom,
        height: 65 + insets.bottom,
        paddingTop: 8
      }}
      className="flex-row bg-white border-t border-gray-100 items-start relative"
    >
      {/* Animated Circular Indicator Background */}
      <AnimatedView 
        style={[indicatorStyle, { height: 50 }]}
        className="absolute top-2 items-center justify-center"
      >
        <View className="w-12 h-12 rounded-full bg-lingua-purple" />
      </AnimatedView>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = (name: string, focused: boolean) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"] = "home";
          if (name === "home") iconName = focused ? "home" : "home-outline";
          else if (name === "learn") iconName = focused ? "book" : "book-outline";
          else if (name === "ai-teacher") iconName = focused ? "school" : "school-outline";
          else if (name === "chat") iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          else if (name === "profile") iconName = focused ? "person" : "person-outline";
          
          return (
            <Ionicons 
              name={iconName} 
              size={22} 
              color={focused ? "#FFFFFF" : "#6b7280"} 
            />
          );
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-start h-[50px]"
          >
            <View className="items-center justify-center h-full w-full">
              <View className="h-5 items-center justify-center">
                {getIcon(route.name, isFocused)}
              </View>
              {!isFocused && (
                <Text className="text-[10px] font-poppins-medium mt-0.5 text-text-secondary">
                  {label as string}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
        }}
      />
      <Tabs.Screen
        name="ai-teacher"
        options={{
          title: "AI Teacher",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
