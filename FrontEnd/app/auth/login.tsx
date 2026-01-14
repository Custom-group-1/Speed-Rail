import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { authApi, getErrorMessage, setAuthToken } from "../../utils/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password });
      
      // Store token internally in API service
      setAuthToken(response.token);
      
      // Navigate to Home
      router.replace("/home");
    } catch (error) {
      Alert.alert("Login Failed", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    //WIP
  };

  const handleSignUp = () => {
    //WIP
    router.replace("/auth/signup");
  };

  const handleForgotPassword = () => {
    //WIP
    router.replace("/auth/codecheck");
  };

  return (
    <ImageBackground
          source={require("../../assets/images/background.png")}
          className="flex-1"
          resizeMode="cover"
    >
      <View className="flex-1 px-6">
        {/* Title */}
        <Text className="text-white text-center mt-20 text-3xl font-semibold">
            Speed Rail
        </Text>
        <Text className="text-white text-lg text-left py-6 text-2xl font-medium">
            Web app for calculating speed in Honkai: Star Rail
        </Text>
        <Text className="text-white text-left mb-6">
            Chào mừng! Xin hãy đăng nhập.
        </Text>

        {/* Inputs */}
        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="Username or Email"
                placeholderTextColor="#555"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
        </View>

        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="Password"
                placeholderTextColor="#555"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
        </View>


        <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setRemember(!remember)}
            >
            <View
                className={`w-5 h-5 mr-2 rounded-sm border-2 border-white ${
                remember ? "bg-[#58669A]" : "bg-transparent"
                }`}
            />
            <Text className="text-white">Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleForgotPassword()}>
            <Text className="text-gray-300 underline">Forgot password?</Text>
            </TouchableOpacity>
        </View>

        {/* Buttons */}
        <TouchableOpacity 
            className={`bg-[#58669A] py-3 rounded-lg mb-4 flex-row justify-center items-center ${isLoading ? 'opacity-70' : ''}`}
            onPress={() => handleLogin()}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-center font-bold">Login</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity 
            className="bg-black py-3 rounded-lg mb-6"
            onPress={() => handleGoogleLogin()}
        >
            <Text className="text-white text-center">Or sign in with Google</Text>
        </TouchableOpacity>

        {/* Sign up */}
        <View className="flex-row justify-center">
            <Text className="text-white">Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => handleSignUp()}>
            <Text className="text-[#58669A] underline">Sign up now!</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
