import { View, Text, Image, TouchableOpacity } from "react-native";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";

const [relicSet, setRelicSet] = useState("Set 4");

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#0c1220]">
      {/* Card */}
      <View className="mx-4 mt-4 rounded-2xl bg-[#4c589e]/60 p-4">
        
        {/* Top Row */}
        <View className="flex-row items-center">
          {/* 4 Slots */}
          <View className="flex-1 flex-row justify-around ml-3">
            {[1,2,3,4].map((i)=>(
              <TouchableOpacity
                key={i}
                className="w-16 h-16 rounded-full bg-white/30 items-center justify-center"
              >
                <Text className="text-white text-4xl">+</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Eidolons Select */}
			<View className="mt-3">
			<Text className="text-white text-lg mb-1">Eidolons:</Text>
			<View className="bg-[#c7c29b] rounded-xl px-4 py-2 w-24">
				<Text className="text-black">E1 ▼</Text>
			</View>
			</View>

        {/* Lightcone */}
        <View className="mt-3">
          <Text className="text-white text-lg mb-1">Lightcone:</Text>
          <View className="flex-row">
            <View className="flex-1 bg-[#c7c29b] rounded-xl px-4 py-2 mr-2">
              <Text numberOfLines={1} className="text-black">
                ...
              </Text>
            </View>

            <View className="bg-[#c7c29b] rounded-xl px-4 py-2 w-16">
              <Text className="text-black">S1 ▼</Text>
            </View>
          </View>
        </View>

        {/* Relic Set */}
        <Dropdown
			label="Relic Set:"
			items={["Set 2", "Set 4"]}
			value={relicSet}
			onSelect={setRelicSet}
		/>


        {/* Spacer Icons (Relic sets) */}
        <View className="mt-2 flex-row">
          <TouchableOpacity className="bg-[#c7c29b] rounded-xl flex-row items-center px-3 py-2">
            <Image
              source={require("../../assets/images/sample.png")}
              className="w-6 h-6 mr-2 rounded-full"
            />
            <Text className="text-black">Pioneer Diver</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#c7c29b]/30 rounded-xl flex-row items-center px-3 py-2 ml-3">
            <Text className="text-black opacity-60">Select ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View className="mt-5 flex-row justify-between">
          <TouchableOpacity className="px-6 py-2 bg-[#c7c29b] rounded-xl flex-row items-center">
            <Text className="text-black text-lg mr-2">Preset</Text>
            <Text className="text-black text-xl">🛠</Text>
          </TouchableOpacity>

          <TouchableOpacity className="px-8 py-2 bg-[#c7c29b] rounded-xl">
            <Text className="text-black text-lg">Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Timeline Row */}
      <View className="mt-10 items-center">
        <View className="w-[90%] h-1 bg-white rounded-full" />
        <Image
          source={require("../../assets/images/sample.png")}
          className="w-12 h-12 rounded-full mt-[-16]"
        />
      </View>

      {/* Cycle box */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <View className="flex-row bg-[#c7c29b] rounded-xl px-6 py-3">
          <Text className="text-black text-xl mr-3">Cycle: 0</Text>
          <View className="justify-between">
            <Text className="text-black">▲</Text>
            <Text className="text-black mt-1">▼</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
