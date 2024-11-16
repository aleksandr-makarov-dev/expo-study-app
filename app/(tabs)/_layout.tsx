import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import FontAwesomeIcons from "@expo/vector-icons/FontAwesome6";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons size={20} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons size={20} name="folder-open" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
