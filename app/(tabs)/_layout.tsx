import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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
          title: "Study",
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="folder" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Import",
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="plus-box" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="book" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
