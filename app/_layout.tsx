import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QuizProvider } from "@/contexts/QuizContext";
import Colors from "@/constants/colors";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" />
      <Stack.Screen name="quiz/q01" />
      <Stack.Screen name="quiz/q01a" />
      <Stack.Screen name="quiz/q02" />
      <Stack.Screen name="quiz/q02a" />
      <Stack.Screen name="quiz/q03" />
      <Stack.Screen name="quiz/q03a" />
      <Stack.Screen name="quiz/q03b" />
      <Stack.Screen name="quiz/q04" />
      <Stack.Screen name="quiz/q05" />
      <Stack.Screen name="quiz/q05a" />
      <Stack.Screen name="quiz/q05b" />
      <Stack.Screen name="quiz/q05c" />
      <Stack.Screen name="result/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QuizProvider>
          <RootLayoutNav />
        </QuizProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}