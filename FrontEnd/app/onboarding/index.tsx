import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

const steps = [
  {
    title: "Dự đoán lượt đi,\nlàm chủ trận đấu!",
    description:
      "Speed Rail giúp bạn dự đoán chính xác và trực quan lượt đi của mọi nhân vật, chấm dứt việc đoán mò thứ tự hành động.",
    image: require("../../assets/images/onboard.webp"),
  },
  {
    title: "Mô phỏng lượt đi \nTỐC ĐỘ CAO",
    description:
      "Chỉ cần nhập Tốc độ, Speed Rail sẽ tự động trực quan hóa thứ tự hành động trên thanh, mô phỏng ảnh hưởng tăng/giảm tốc, giúp bạn tối ưu hóa đội hình một cách nhanh chóng.",
    image: require("../../assets/images/onboard.webp"),
  },
  {
    title: "Cực kỳ hiệu quả \nvà vượt trội!",
    description:
      "Tất cả gói gọn trong một: Nhập liệu, mô phỏng tức thì, lưu đội hình và thiết kế di động giúp việc tối ưu tốc độ chưa bao giờ dễ dàng đến thế!",
    image: require("../../assets/images/onboard.webp"),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleDone = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/home");
  };

  return (
    <ImageBackground
              source={require("../../assets/images/background.png")}
              className="flex-1"
              resizeMode="cover"
    >
      <View className="flex-1">
        <Text className="text-white text-center mt-20 text-3xl font-semibold">
          Speed Rail
        </Text>

        <View className="flex-1 mt-6">
          <FlatList
            testID="onboarding-flatlist"
            ref={flatListRef}
            data={steps}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            getItemLayout={(_, index) => ({
              length: 400,
              offset: 400 * index,
              index,
            })}
            onScrollToIndexFailed={() => {}}
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

        <View className="w-full px-6 mb-8">
          <TouchableOpacity
            testID="next-finish-button"
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

          <TouchableOpacity testID="skip-button" onPress={handleDone}>
            <Text className="text-white/60 text-center text-lg mt-4">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
  </ImageBackground>
  );
}
