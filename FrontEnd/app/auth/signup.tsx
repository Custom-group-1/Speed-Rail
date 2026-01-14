import { useRouter } from "expo-router";
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
import { authApi, getErrorMessage, setAuthToken } from "../../utils/api";

export default function SignupScreen() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.replace("/auth/login");
  };

  const handleSignUp = async () => {
    if (!email || !name || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
    }

    if (password !== repassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
    }

    setIsLoading(true);
    try {
        const response = await authApi.signup({
            email,
            name,
            password
        });
        
        // Auto login after signup
        setAuthToken(response.token);
        
        Alert.alert("Success", "Account created successfully!", [
            { text: "OK", onPress: () => router.replace("/home") }
        ]);

    } catch (error) {
        Alert.alert("Signup Failed", getErrorMessage(error));
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
            Chào mừng Nhà khai phá mới!
        </Text>

        {/* Inputs */}
        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="name (e.g. Trailblazer)"
                placeholderTextColor="#555"
                value={name}
                onChangeText={setname}
            />
        </View>

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

        <View className="flex-row items-center bg-white rounded-lg mb-4">
            <View className="w-3 h-full bg-[#58669A] rounded-l-lg" />
            <TextInput
                className="flex-1 px-4 py-3 text-black"
                placeholder="Re-enter Password"
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
            className={`bg-[#58669A] py-3 rounded-lg mb-4 flex-row justify-center ${isLoading ? 'opacity-70' : ''}`}
            onPress={() => handleSignUp()}
            disabled={isLoading || password !== repassword}
        >
             {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-center font-bold">Sign up</Text>
            )}
        </TouchableOpacity>

        {/* Sign in */}
        <View className="flex-row justify-center">
            <Text className="text-white">Already have an account? </Text>
            <TouchableOpacity onPress={() => handleLogin()}>
            <Text className="text-[#58669A] underline">Log in here!</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}