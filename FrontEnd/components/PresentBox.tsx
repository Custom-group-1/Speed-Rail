import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PresetBoxProps {
  name: string;
  characters: string[]; // Tên các character
  onEdit: () => void;
  onDelete: () => void;
}

export default function PresetBox({
  name,
  characters,
  onEdit,
  onDelete,
}: PresetBoxProps): React.ReactElement {
  const hasCharacters = characters.length > 0;

  return (
    <View className="w-full rounded-2xl overflow-hidden mb-4">

      {/* Header */}
      <View className="bg-[#c7b97a] py-0.5 px-4 flex-row justify-between items-center">
        <Text className="text-[20px] font-semibold text-black">{name}</Text>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={onEdit}
            className="bg-[#d2c98a] px-3 py-1 rounded-lg mr-2"
          >
            <Text className="text-[18px] text-black">✎</Text>
          </TouchableOpacity>

          {/* X luôn hiển thị, opacity thay đổi */}
          <TouchableOpacity
            onPress={onDelete}
            className="px-3 py-1 rounded-lg bg-[#a33]"
            style={{ opacity: hasCharacters ? 1 : 0.3 }}
            disabled={!hasCharacters} // vẫn disable khi không có character
          >
            <Text className="text-[18px] font-bold text-black">X</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View className="bg-[#6f7c98] py-2 px-4 flex-row justify-between">
        {[0, 1, 2, 3].map((slot, index) => (
          <View
            key={index}
            className="w-16 h-16 bg-white rounded-full justify-center items-center overflow-hidden"
          >
            <Image
              source={require("../assets/images/sample.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </View>
  );
}
