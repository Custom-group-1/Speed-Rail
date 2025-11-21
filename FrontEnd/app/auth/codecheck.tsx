import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChangePasswordScreen() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const router = useRouter();

  const handleSendCode = () => {
    //WIP
  };

  const handleCheckCode = () => {
    //WIP
    router.replace("/auth/password");
  };

  const handleLogin = () => {
    //WIP
    router.replace("/auth/login");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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
            Hãy để Ponmai giúp bạn lấy lại mật khẩu
        </Text>

        {/* Inputs */}
        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="Email"
                placeholderTextColor="#555"
                value={email}
                onChangeText={setEmail}
                secureTextEntry
            />
            <TouchableOpacity
            className="px-3"
            onPress={handleSendCode}
            >
            <Ionicons name="send" size={24} color="#58669A" />
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="Code"
                placeholderTextColor="#555"
                value={code}
                onChangeText={setCode}
                secureTextEntry
            />
        </View>
        
        <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white">
                    Mã hết hạn sau {timeLeft}s
                </Text>
            </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity 
            className="bg-[#58669A] py-3 rounded-lg mb-4"
            onPress={() => handleCheckCode()}
        >
            <Text className="text-white text-center font-bold">Change Password</Text>
        </TouchableOpacity>

        {/* Sign in */}
        <View className="flex-row justify-center">
            <Text className="text-white">Already have an account? </Text>
            <TouchableOpacity onPress={() => handleLogin()}>
            <Text className="text-[#58669A] underline">Sign in here!</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
