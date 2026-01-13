import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

export default function CodeCheckScreen() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  const router = useRouter();

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
    }

    setLoadingSend(true);
    try {
        await authApi.sendForgotPasswordCode(email);
        setTimeLeft(60); // Reset timer
        Alert.alert("Code Sent", "Please check your email for the verification code.");
    } catch (error) {
        Alert.alert("Failed to send code", getErrorMessage(error));
    } finally {
        setLoadingSend(false);
    }
  };

  const handleCheckCode = async () => {
    if (!code || !email) {
        Alert.alert("Error", "Please enter your email and the code.");
        return;
    }

    setLoadingVerify(true);
    try {
        const result = await authApi.verifyCode(email, code);
        if (result.valid) {
             // Pass email and code to the password reset screen
             router.replace({
                pathname: "/auth/password",
                params: { email, code }
            });
        } else {
            Alert.alert("Error", "Invalid verification code.");
        }
    } catch (error) {
        Alert.alert("Verification Failed", getErrorMessage(error));
    } finally {
        setLoadingVerify(false);
    }
  };

  const handleLogin = () => {
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
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TouchableOpacity
                className="px-3"
                onPress={handleSendCode}
                disabled={timeLeft > 0 || loadingSend}
            >
                {loadingSend ? (
                    <ActivityIndicator size="small" color="#58669A" />
                ) : (
                    <Ionicons 
                        name="send" 
                        size={24} 
                        color={timeLeft > 0 ? "#ccc" : "#58669A"} 
                    />
                )}
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
                keyboardType="numeric"
            />
        </View>
        
        <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row justify-between items-center mb-6">
                {timeLeft > 0 ? (
                    <Text className="text-white">
                        Mã hết hạn sau {timeLeft}s
                    </Text>
                ) : (
                    <Text className="text-gray-400">
                        Nhấn nút gửi để nhận mã
                    </Text>
                )}
            </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity 
            className={`bg-[#58669A] py-3 rounded-lg mb-4 flex-row justify-center ${loadingVerify ? 'opacity-70' : ''}`}
            onPress={() => handleCheckCode()}
            disabled={loadingVerify}
        >
             {loadingVerify ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-center font-bold">Verify Code</Text>
            )}
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