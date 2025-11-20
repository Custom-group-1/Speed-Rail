import React, { useRef, useState } from "react";
import { Animated, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import Dropdown from "../../components/Dropdown";

export default function HomeScreen() {
  const [eidolon, setEidolon] = useState("E1");
  const [lightcone, setLightcone] = useState("Along the Passing Sh..");
  const [lightconeS, setLightconeS] = useState("S1");
  const [relicSet, setRelicSet] = useState("Set 4");

  const [currentChar, setCurrentChar] = useState(1);
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const [columnWidth, setColumnWidth] = useState(0);

  const [openDropdown, setOpenDropdown] = useState<"eidolon" | "lightcone" | "relicset" | null>(null);

  const handlePress = (index: number) => {
    setCurrentChar(index);
    Animated.timing(highlightAnim, {
      toValue: (index - 1) * columnWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };


  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 mt-4 px-4 py-8">

        {/* === CARD MAIN === */}
        <View
          className="rounded-2xl"
          style={{
            backgroundColor: "rgba(76, 88, 158)"
          }}
        >
          {/* TOP SECTION */}
          <View 
            className="flex-row items-center overflow-hidden bg-[#7f89c4] relative" 
            style={{
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            {/* Highlight Box */}
            {columnWidth > 0 && (
              <Animated.View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: columnWidth,
                  height: "100%",
                  backgroundColor: "rgba(76,88,158)", // nên cho alpha để nhìn thấy bên dưới
                  transform: [{ translateX: highlightAnim }],
                }}
              />
            )}

            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                className="flex-1 items-center justify-center py-3"
                onLayout={(event) => {
                  const width = event.nativeEvent.layout.width;
                  if (width !== columnWidth) setColumnWidth(width); // set lần đầu
                }}
              >
                <TouchableOpacity
                  className="w-14 h-14 rounded-full bg-white items-center justify-center"
                  onPress={() => handlePress(i)}
                >
                  <Text className="text-[#4c589e] text-4xl">+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>


          {/* === Eidolons === */}
          <View className="flex-row items-center mt-4 mb-1 px-3">
            <Text className="text-white text-lg w-28">Eidolons:</Text>
            <View className="flex-1">
              <Dropdown
                items={["E0", "E1", "E2", "E3", "E4", "E5", "E6"]}
                value={eidolon}
                onSelect={setEidolon}
                isOpen={openDropdown === "eidolon"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "eidolon" ? null : "eidolon")
                }
              />
            </View>
          </View>

          {/* === Lightcone === */}
          <View className="flex-row items-center mt-4 mb-1 px-3">
            <Text className="text-white text-lg w-28">Lightcone:</Text>
            <View className="flex-1">
              <Dropdown
                items={["S1", "S2", "S3", "S4", "S5", "S6"]}
                value={lightconeS}
                onSelect={setLightconeS}
                isOpen={openDropdown === "lightcone"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "lightcone" ? null : "lightcone")
                }
              />
            </View>
          </View>

          {/* === Relic Set === */}
          <View className="flex-row items-center mt-4 mb-1 px-3">
            <Text className="text-white text-lg w-28">Relic Sets:</Text>
            <View className="flex-1">
              <Dropdown
                items={["Set 2 + 2", "Set 4"]}
                value={relicSet}
                onSelect={setRelicSet}
                isOpen={openDropdown === "relicset"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "relicset" ? null : "relicset")
                }
              />
            </View>
          </View>
          

          {/* Relic Pair */}
          <View className="flex-row mt-2 px-3">
            <View className="flex-row flex-1">
              {/* Button 1 */}
              <TouchableOpacity className="bg-[#c7c29b] rounded-xl flex-row items-center px-3 py-2 flex-1 mr-2">
                <Image
                  source={require("../../assets/images/sample.png")}
                  className="w-6 h-6 mr-2 rounded-full"
                />
                <Text className="text-black">Relic 1</Text>
              </TouchableOpacity>

              {/* Button 2 */}
              <TouchableOpacity
                className={`flex-1 flex-row items-center px-3 py-2 rounded-xl ${
                  relicSet === "Set 4" ? "bg-[#c7c29b]/50" : "bg-[#c7c29b]"
                }`}
                disabled={relicSet === "Set 4"}
              >
                <Image
                  source={require("../../assets/images/sample.png")}
                  className={`w-6 h-6 mr-2 rounded-full ${relicSet === "Set 4" ? "opacity-50" : "opacity-100"}`}
                />
                <Text className={`${relicSet === "Set 4" ? "text-black/50" : "text-black"}`}>Relic 2</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* === Planar Set === */}
          <View className="flex-col px-3">
            <Text className="text-white text-lg mt-4 mb-1">Planar Sets:</Text>

            {/* Planar */}
            <View className="flex-row mt-2">
              <View className="flex-row flex-1">
                {/* Button 1 */}
                <TouchableOpacity className="bg-[#c7c29b] rounded-xl flex-row items-center px-3 py-2 flex-1">
                  <Image
                    source={require("../../assets/images/sample.png")}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  <Text className="text-black">Relic 1</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Speed Input */}
          <View className="flex-col px-3" style={{paddingBottom: 12}}>
            <Text className="text-white text-lg mt-4 mb-1">Speed Input:</Text>

            <TextInput
              className="bg-[#c7c29b] h-10 rounded-xl px-4 text-black text-left"
              placeholder="Nhập số..."
              placeholderTextColor="#555"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Buttons */}
          <View className="flex-col px-3">
            <View className="flex-row justify-between mt-5 py-3">
              <TouchableOpacity className="px-6 py-2 bg-[#c7c29b] rounded-xl flex-row items-center">
                <Text className="text-black text-lg mr-2">Preset</Text>
              </TouchableOpacity>

              <TouchableOpacity className="px-8 py-2 bg-[#c7c29b] rounded-xl">
                <Text className="text-black text-lg">Save</Text>
              </TouchableOpacity>
            </View>
          </View>

        {/* === TIMELINE === */}
        <View className="mt-10 items-center w-full py-8">
          <View className="w-[90%] h-[3px] bg-white rounded-full" />
        </View>

        {/* === CYCLE BOX === */}
        <View className="absolute bottom-12 left-0 right-0 items-center">
          <View className="flex-row items-center bg-[#c7c29b] rounded-xl px-6 py-3">
            <Text className="text-black text-xl mr-4">Cycle: 0</Text>

            <View>
              <Text className="text-black text-lg">▲</Text>
              <Text className="text-black text-lg mt-1">▼</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
