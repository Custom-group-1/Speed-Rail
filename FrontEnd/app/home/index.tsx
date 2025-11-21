import React, { useRef, useState } from "react";
import { Animated, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import Dropdown from "../../components/Dropdown";
import SelectTab, { SelectItem } from "../../components/SelectTab";


export default function HomeScreen() {
  const [currentChar, setCurrentChar] = useState(1);
  const [characters, setCharacters] = useState<string[]>(["", "", "", ""]);
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const [columnWidth, setColumnWidth] = useState(0);

  const [openDropdown, setOpenDropdown] = useState<"eidolon" | "lightcone" | "relicset" | null>(null);
  const [openSelectTab, setOpenSelectTab] = useState<null | "characters" | "lightcones" | "relicSet" | "planarSet">(null);
  const [relicSelectingSlot, setRelicSelectingSlot] = useState<"relic1" | "relic2">("relic1");

  const [cycle, setCycle] = useState<number>(0);
  const [editingCycle, setEditingCycle] = useState(false);
  const [cycleInput, setCycleInput] = useState<string>(cycle.toString());

  {/* Sau này sửa lại khi có database API */}
  const charactersData: SelectItem[] = [
    { id: 1, name: "Character 1", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Character 2", image: require("../../assets/images/sample.png") },
    { id: 3, name: "Character 3", image: require("../../assets/images/sample.png") },
    { id: 4, name: "Character 4", image: require("../../assets/images/sample.png") },
  ];

  const lightconesData: SelectItem[] = [
    { id: 1, name: "Lightcone 1", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Lightcone 2", image: require("../../assets/images/sample.png") },
  ];

  const relicSetData: SelectItem[] = [
    { id: 1, name: "Set 1", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Set 2", image: require("../../assets/images/sample.png") },
    { id: 3, name: "Set 3", image: require("../../assets/images/sample.png") },
    { id: 4, name: "Set 4", image: require("../../assets/images/sample.png") },
    { id: 5, name: "Set 5", image: require("../../assets/images/sample.png") },
    { id: 6, name: "Set 6", image: require("../../assets/images/sample.png") },
    { id: 7, name: "Set 7", image: require("../../assets/images/sample.png") },
    { id: 8, name: "Set 8", image: require("../../assets/images/sample.png") },
    { id: 9, name: "Set 9", image: require("../../assets/images/sample.png") },
    { id: 10, name: "Set 10", image: require("../../assets/images/sample.png") },
    { id: 11, name: "Set 11", image: require("../../assets/images/sample.png") },
    { id: 12, name: "Set 12", image: require("../../assets/images/sample.png") },
    { id: 13, name: "Set 13", image: require("../../assets/images/sample.png") },
    { id: 14, name: "Set 14", image: require("../../assets/images/sample.png") },
    { id: 15, name: "Set 15", image: require("../../assets/images/sample.png") },
    { id: 16, name: "Set 16", image: require("../../assets/images/sample.png") },
  ];

  const planarSetData: SelectItem[] = [
    { id: 1, name: "Planar 1", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Planar 2", image: require("../../assets/images/sample.png") },
    { id: 3, name: "Planar 3", image: require("../../assets/images/sample.png") },
    { id: 4, name: "Planar 4", image: require("../../assets/images/sample.png") },
    { id: 5, name: "Planar 5", image: require("../../assets/images/sample.png") },
    { id: 6, name: "Planar 6", image: require("../../assets/images/sample.png") },
    { id: 7, name: "Planar 7", image: require("../../assets/images/sample.png") },
    { id: 8, name: "Planar 8", image: require("../../assets/images/sample.png") },
  ];

  const [characterData, setCharacterData] = useState<Record<number, {
    eidolon: string;
    lightcone: string;
    lightconeS: string;
    relicSet: string;
    relic1: string;
    relic2: string;
    planarSet: string;
    spd: string;
  }>>({
    1: { eidolon: "E0", lightcone: "", lightconeS: "S1", relicSet: "Set 4", relic1: "", relic2: "", planarSet: "", spd: "" },
    2: { eidolon: "E0", lightcone: "", lightconeS: "S1", relicSet: "Set 4", relic1: "", relic2: "", planarSet: "", spd: "" },
    3: { eidolon: "E0", lightcone: "", lightconeS: "S1", relicSet: "Set 4", relic1: "", relic2: "", planarSet: "", spd: "" },
    4: { eidolon: "E0", lightcone: "", lightconeS: "S1", relicSet: "Set 4", relic1: "", relic2: "", planarSet: "", spd: "" },
  });

  const handlePress = (i: number) => {
    if (currentChar === i) {
      setOpenSelectTab("characters");
    } else {
      setCurrentChar(i);
      Animated.timing(highlightAnim, {
        toValue: columnWidth * (i - 1),
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressSelect = (
    context: "characters" | "lightcones" | "relicSet" | "planarSet"
  ) => {
    setOpenSelectTab(context);
  };

  const handleChoose = (item: SelectItem, context: "characters" | "lightcones" | "relicSet" | "planarSet") => {
    setCharacterData(prev => {
      const char = prev[currentChar];
      switch(context) {
        case "characters":
          const newChars = [...characters];
          newChars[currentChar - 1] = item.name;
          setCharacters(newChars);
          return prev;
        case "lightcones":
          return { ...prev, [currentChar]: { ...char, lightcone: item.name } };
        case "relicSet":
          return { ...prev, [currentChar]: { ...char, [relicSelectingSlot]: item.name } };
        case "planarSet":
          return { ...prev, [currentChar]: { ...char, planarSet: item.name } };
        default:
          return prev;
      }
    });
    setOpenSelectTab(null);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 mt-3 px-4">

        {/* === CARD MAIN === */}
        <View
          className="rounded-2xl"
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "#59659A",
          }}
        >
          {/* TOP SECTION */}
          <View 
            className="flex-row items-center overflow-hidden bg-[#7B8BA6] relative" 
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
                  backgroundColor: "#59659A",
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
                  if (width !== columnWidth) setColumnWidth(width);
                }}
              >
                <TouchableOpacity
                  className="w-14 h-14 rounded-full bg-white items-center justify-center"
                  onPress={() => handlePress(i)}
                >
                  {characters[i - 1] ? (
                    <Text className="text-[#59659A] text-base">{characters[i - 1]}</Text>
                  ) : (
                    <Image
                      source={require("../../assets/images/sample.png")}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              </View>
            ))}

          </View>

          {/* === Eidolons === */}
          <View className="flex-row items-center mt-3 mb-1 px-3">
            <Text className="text-white text-lg w-28">Eidolons:</Text>
            <View className="flex-1">
              <Dropdown
                items={["E0", "E1", "E2", "E3", "E4", "E5", "E6"]}
                value={characterData[currentChar].eidolon}
                onSelect={(val) =>
                  setCharacterData({
                    ...characterData,
                    [currentChar]: { ...characterData[currentChar], eidolon: val }
                  })
                }
                isOpen={openDropdown === "eidolon"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "eidolon" ? null : "eidolon")
                }
              />
            </View>
          </View>

          {/* === Lightcone === */}
          <View className="flex-row items-center mt-3 mb-1 px-3">
            <Text className="text-white text-lg w-28">Lightcone:</Text>

            <View className="flex-[1] mr-3">
              <Dropdown
                items={["S1", "S2", "S3", "S4", "S5", "S6"]}
                value={characterData[currentChar].lightconeS}
                onSelect={(val) =>
                  setCharacterData({
                    ...characterData,
                    [currentChar]: { ...characterData[currentChar], lightconeS: val }
                  })
                }
                isOpen={openDropdown === "lightcone"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "lightcone" ? null : "lightcone")
                }
              />
            </View>

            <TouchableOpacity
              className="flex-[2] bg-[#c7c29b] py-2 items-center ml-3 items-center justify-center"
              style={{
                height: 40,
                borderRadius: 16,
              }}
              onPress={() => handlePressSelect("lightcones")}
            > 
              <Text
                className="font-medium"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {characterData[currentChar].lightcone || "Chọn Lightcone"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* === Relic Set === */}
          <View className="flex-row items-center mt-3 mb-1 px-3">
            <Text className="text-white text-lg w-28">Relic Sets:</Text>
            <View className="flex-1">
              <Dropdown
                items={["Set 2/2", "Set 4"]}
                value={characterData[currentChar].relicSet}
                onSelect={(val) =>
                  setCharacterData({
                    ...characterData,
                    [currentChar]: { ...characterData[currentChar], relicSet: val }
                  })
                }
                isOpen={openDropdown === "relicset"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "relicset" ? null : "relicset")
                }
              />
            </View>
          </View>
          
          {/* Relic Pair */}
          <View className="flex-row items-center mt-3 mb-1 px-3">
            <View className="flex-row">
              {/* Relic 1 */}
              <TouchableOpacity
                onPress={() => { setRelicSelectingSlot("relic1"); handlePressSelect("relicSet"); }}
                className="bg-[#c7c29b] rounded-xl flex-row items-center px-3 py-2 flex-1 mr-2"
              >
                <Image source={require("../../assets/images/sample.png")} className="w-6 h-6 mr-2 rounded-full" />
                <Text className="font-medium">{characterData[currentChar].relic1 || "Relic 1"}</Text>
              </TouchableOpacity>

              {/* Relic 2 */}
              <TouchableOpacity
                onPress={() => { setRelicSelectingSlot("relic2"); handlePressSelect("relicSet"); }}
                disabled={characterData[currentChar].relicSet === "Set 4"}
                className={`flex-1 flex-row items-center px-3 py-2 rounded-xl ${
                  characterData[currentChar].relicSet === "Set 4" ? "bg-[#c7c29b]/50" : "bg-[#c7c29b]"
                }`}
              >
                <Image
                  source={require("../../assets/images/sample.png")}
                  className={`w-6 h-6 mr-2 rounded-full ${
                    characterData[currentChar].relicSet === "Set 4" ? "opacity-50" : "opacity-100"
                  }`}
                />
                <Text className={`${characterData[currentChar].relicSet === "Set 4" ? "font-medium/50" : "font-medium"}`}>
                  {characterData[currentChar].relic2 || "Relic 2"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          
          {/* === Planar Set === */}
          <View className="flex-col px-3">
            <Text className="text-white text-lg mt-3 mb-1">Planar Sets:</Text>
            <View className="flex-row mt-2">
              <View className="flex-row flex-1">
                <TouchableOpacity
                  onPress={() => handlePressSelect("planarSet")}
                  className="bg-[#c7c29b] rounded-xl flex-row items-center px-3 py-2 flex-1"
                >
                  <Image source={require("../../assets/images/sample.png")} className="w-6 h-6 mr-2 rounded-full" />
                  <Text className="font-medium">{characterData[currentChar].planarSet || "Planar"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Speed Input */}
          <View className="flex-col px-3" style={{paddingBottom: 12}}>
            <Text className="text-white text-lg mt-3 mb-1">Speed Input:</Text>

            <TextInput
              className="bg-[#c7c29b] h-10 rounded-xl px-4 text-black text-left"
              placeholder="Nhập số..."
              placeholderTextColor="#555"
              keyboardType="numeric"
              value={characterData[currentChar].spd}
              onChangeText={(val) => 
                setCharacterData({
                  ...characterData,
                  [currentChar]: {
                    ...characterData[currentChar],
                    spd: val,
                  }
                })
              }
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-col px-3 mt-5">
          <View className="flex-row justify-between">
            <TouchableOpacity className="px-6 py-2 bg-[#c7c29b] rounded-xl flex-row items-center">
              <Text className="font-medium text-lg mr-2">Preset</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-8 py-2 bg-[#c7c29b] rounded-xl">
              <Text className="font-medium text-lg">Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === TIMELINE === */}
        <View className="mt-10 items-center w-full py-12">
          <View className="w-[90%] h-[3px] bg-white rounded-full" />
        </View>

        {/* === CYCLE BOX === */}
        <View className="absolute bottom-12 left-0 right-0 items-center">
          <View className="flex-row items-center justify-center bg-[#c7c29b] rounded-2xl px-6 py-1 w-[40%] ">
            {/* Label + Cycle display / input */}
            {editingCycle ? (
              <View className="flex-row items-center">
                <Text className="text-white font-semibold text-lg mr-2">Cycle:</Text>
                <TextInput
                  className="bg-[#c7c29b] w-20 h-8 text-center text-black font-semibold text-lg rounded-md"
                  keyboardType="numeric"
                  value={cycleInput}
                  onChangeText={setCycleInput}
                  onBlur={() => {
                    const num = parseInt(cycleInput);
                    if (!isNaN(num) && num >= 0) setCycle(num);
                    setEditingCycle(false);
                  }}
                  onSubmitEditing={() => {
                    const num = parseInt(cycleInput);
                    if (!isNaN(num) && num >= 0) setCycle(num);
                    setEditingCycle(false);
                  }}
                  autoFocus
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setCycleInput(cycle.toString());
                  setEditingCycle(true);
                }}
                className="flex-row items-center"
              >
                <Text className="text-white font-semibold text-lg mr-2">Cycle:</Text>
                <Text className="font-semibold text-lg">{cycle}</Text>
              </TouchableOpacity>
            )}

            {/* Up / Down buttons */}
            <View className="flex-col ml-4">
              <TouchableOpacity
                onPress={() => setCycle(prev => prev + 1)}
                className="px-2 py-1 bg-[#8a947d] rounded-md mb-1"
              >
                <Text className="font-bold text-lg">▲</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCycle(prev => (prev > 0 ? prev - 1 : 0))}
                className="px-2 py-1 bg-[#8a947d] rounded-md"
              >
                <Text className="font-bold text-lg">▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    {openSelectTab && (
      <SelectTab
        context={openSelectTab}
        items={
          openSelectTab === "characters"
            ? charactersData
            : openSelectTab === "lightcones"
            ? lightconesData
            : openSelectTab === "relicSet"
            ? relicSetData
            : planarSetData
        }
        onClose={() => setOpenSelectTab(null)}
        onChoose={handleChoose}
      />
    )}

    </ImageBackground>
  );
}
