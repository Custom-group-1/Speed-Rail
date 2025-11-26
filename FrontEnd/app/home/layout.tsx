import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PresetBox from "../../components/PresentBox";

export default function LayoutScreen() {
  const router = useRouter();
  const [activePreset, setActivePreset] = React.useState<number | null>(null);

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 mt-3 px-4">
        <View className="h-[80%] bg-[#59659A] rounded-2xl py-3 px-3">
          <View className="items-end mb-3">
            <TouchableOpacity
              onPress={() => router.replace("/home")}
              className="py-1.5 px-3 bg-[#49527A] rounded-xl items-center justify-center"
            >
              <Text className="text-white text-xl">←</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 bg-[#59659A] rounded-t-2xl py-3 px-3">
            <View className="h-[95%]">
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                {/* === LIST OF PRESETS === */}
                {[1, 2, 3].map((id) => (
                  <TouchableOpacity
                    key={id}
                    activeOpacity={0.7}
                    onPress={() => setActivePreset(id)}
                    className={`rounded-2xl`}
                    style={{ opacity: activePreset === id ? 1 : 0.5 }}
                  >
                    <PresetBox
                      name={`Preset ${id}`}
                      characters={[]}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* === Monetization Baby === */}
            <View className="mt-2 flex-row justify-center items-center">
              <Text className="text-white text-base">Buy more presets with{" "}</Text>
              <TouchableOpacity>
                <Text className="text-[#c7c29b] font-semibold text-base underline">
                  Premium
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-col px-4 mt-12">
          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              className="w-[40%] py-2 bg-[#c7c29b] rounded-xl flex-row justify-center items-center"
              onPress={() => router.replace("/home")}
            >
              <Text className="font-medium text-lg text-center">Chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
