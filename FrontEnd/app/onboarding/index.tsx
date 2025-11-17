import { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const steps = [
  {
    title: "Dự đoán lượt đi,\nlàm chủ trận đấu!",
    description:
      "Speed Rail giúp bạn dự đoán chính xác và trực quan lượt đi của mọi nhân vật, chấm dứt việc đoán mò thứ tự hành động.",
    image: require("../../assets/images/templateOnboarding.png"),
  },
  {
    title: "Xây dựng chiến lược\nvượt trội!",
    description:
      "Biết trước lượt đi cho phép bạn tính toán combo, buff – debuff và tối ưu mọi quyết định chiến đấu.",
    image: require("../../assets/images/templateOnboarding.png"),
  },
  {
    title: "Sử dụng dễ dàng,\nhỗ trợ mọi tựa game!",
    description:
      "Giao diện trực quan, tốc độ cao và chính xác. Dù bạn chơi game nào, Speed Rail đều hỗ trợ.",
    image: require("../../assets/images/templateOnboarding.png"),
  },
];

const flatListRef = useRef<FlatList<any>>(null);

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const handleDone = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/home");
  };

  return (
    <View className="flex-1 bg-[#0C1220]">
      {/* Background stars */}
      <Image
        source={require("../../assets/images/background.png")}
        className="absolute w-full h-full opacity-70"
        resizeMode="cover"
      />

      {/* Title */}
      <Text className="text-white text-center mt-20 text-3xl font-semibold">
        Speed Rail
      </Text>

      {/* Slide content */}
      <View className="flex-1 mt-10">
        <FlatList
          ref={flatListRef}
          data={steps}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const newIndex = Math.round(
              x / e.nativeEvent.layoutMeasurement.width
            );
            setIndex(newIndex);
          }}
          renderItem={({ item }) => {
            return (
              <View className="w-screen px-6 items-center">
                <View className="bg-white/90 rounded-3xl w-full items-center py-10">
                  <Image
                    source={item.image}
                    className="w-72 h-72"
                    resizeMode="contain"
                  />
                </View>

                <Text className="text-white text-center text-4xl font-bold mt-10 leading-snug">
                  {item.title}
                </Text>

                <Text className="text-white/90 text-center text-base mt-5 px-6 leading-relaxed">
                  {item.description}
                </Text>
              </View>
            );
          }}
        />
      </View>

      {/* Buttons */}
      <View className="w-full px-6 mb-16">
        {/* Next */}
        <TouchableOpacity
          className="bg-[#5568A0] py-3 rounded-xl"
          onPress={() => {
            if (index < steps.length - 1) {
              flatListRef.current?.scrollToIndex({
                index: index + 1,
                animated: true,
              });
            } else {
              handleDone();
            }
          }}
        >
          <Text className="text-white text-center text-lg font-medium">
            {index === steps.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity onPress={handleDone}>
          <Text className="text-white/60 text-center text-lg mt-4">Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
