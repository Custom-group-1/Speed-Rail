import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert
} from "react-native";
import { authApi, getErrorMessage } from "../../utils/api";

export default function ChangePasswordScreen() {
  const params = useLocalSearchParams();
  const { email, code } = params;

  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.replace("/auth/login");
  };

  const handleSuccess = async () => {
    if (password !== repassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
    }

    if (!email || !code) {
        Alert.alert("Error", "Missing reset information. Please start over.");
        router.replace("/auth/codecheck");
        return;
    }

    setIsLoading(true);
    try {
        await authApi.resetPassword(
            email as string, 
            code as string, 
            password
        );
        Alert.alert("Success", "Password changed successfully!", [
            { text: "Login Now", onPress: () => router.replace("/auth/login") }
        ]);
    } catch (error) {
        Alert.alert("Failed", getErrorMessage(error));
    } finally {
        setIsLoading(false);
    }
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
            Hãy nhập mật khẩu mới
        </Text>

        {/* Inputs */}
        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="New Password"
                placeholderTextColor="#555"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
        </View>

        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="Re-enter New Password"
                placeholderTextColor="#555"
                value={repassword}
                onChangeText={setRePassword}
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

            {password !== repassword && repassword.length > 0 && (
                <Text className="text-red-500 mb-2">Wrong password</Text>
            )}
        </View>

        {/* Buttons */}
        <TouchableOpacity
            className={`py-3 rounded-lg mb-4 flex-row justify-center ${
                password === repassword && password.length > 0 && !isLoading
                ? "bg-[#58669A]"
                : "bg-gray-400"
            }`}
            onPress={() => handleSuccess()}
            disabled={password !== repassword || password.length === 0 || isLoading}
            >
            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-center font-bold">Reset Password</Text>
            )}
        </TouchableOpacity>

        {/* Sign in */}
        <View className="flex-row justify-center">
            <Text className="text-white">Already have an account? </Text>
            <TouchableOpacity onPress={() => handleLogin()}>
            <Text className="text-[#58669A] underline">Login here!</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}