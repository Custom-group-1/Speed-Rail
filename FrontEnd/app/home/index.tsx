import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import Dropdown from "../../components/Dropdown";
import SelectTab, { SelectItem } from "../../components/SelectTab";


export default function HomeScreen() {
  const router = useRouter();
  
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

  // ====================================================================
  // 1. CHARACTERS (Alphabetical Order for easier mapping)
  // ====================================================================
  const charactersData: SelectItem[] = [
    { id: 1, name: "Argenti", image: require("../../assets/images/Characters/Argenti.png") },
    { id: 2, name: "Arlan", image: require("../../assets/images/Characters/Arlan.png") },
    { id: 3, name: "Asta", image: require("../../assets/images/Characters/Asta.png") },
    { id: 4, name: "Bailu", image: require("../../assets/images/Characters/Bailu.png") },
    { id: 5, name: "Blade", image: require("../../assets/images/Characters/Blade.png") },
    { id: 6, name: "Bronya", image: require("../../assets/images/Characters/Bronya.png") },
    { id: 7, name: "Clara", image: require("../../assets/images/Characters/Clara.png") },
    { id: 8, name: "Dan Heng", image: require("../../assets/images/Characters/DanHeng.png") },
    { id: 9, name: "Dan Heng • Imbibitor Lunae", image: require("../../assets/images/Characters/DHIL.png") },
    { id: 10, name: "Dr. Ratio", image: require("../../assets/images/Characters/DrRatio.png") },
    { id: 11, name: "Fu Xuan", image: require("../../assets/images/Characters/FuXuan.png") },
    { id: 12, name: "Gepard", image: require("../../assets/images/Characters/Gepard.png") },
    { id: 13, name: "Guinaifen", image: require("../../assets/images/Characters/Guinaifen.png") },
    { id: 14, name: "Hanya", image: require("../../assets/images/Characters/Hanya.png") },
    { id: 15, name: "Herta", image: require("../../assets/images/Characters/Herta.png") },
    { id: 16, name: "Himeko", image: require("../../assets/images/Characters/Himeko.png") },
    { id: 17, name: "Hook", image: require("../../assets/images/Characters/Hook.png") },
    { id: 18, name: "Huohuo", image: require("../../assets/images/Characters/Huohuo.png") },
    { id: 19, name: "Jing Yuan", image: require("../../assets/images/Characters/JingYuan.png") },
    { id: 20, name: "Jingliu", image: require("../../assets/images/Characters/JingLiu.png") },
    { id: 21, name: "Kafka", image: require("../../assets/images/Characters/Kafka.png") },
    { id: 22, name: "Luka", image: require("../../assets/images/Characters/Luka.png") },
    { id: 23, name: "Luocha", image: require("../../assets/images/Characters/Luocha.png") },
    { id: 24, name: "Lynx", image: require("../../assets/images/Characters/Lynx.png") },
    { id: 25, name: "March 7th", image: require("../../assets/images/Characters/March7th.png") },
    { id: 26, name: "Natasha", image: require("../../assets/images/Characters/Natasha.png") },
    { id: 27, name: "Pela", image: require("../../assets/images/Characters/Pela.png") },
    { id: 28, name: "Qingque", image: require("../../assets/images/Characters/Qingque.png") },
    { id: 29, name: "Ruan Mei", image: require("../../assets/images/Characters/RuanMei.png") },
    { id: 30, name: "Sampo", image: require("../../assets/images/Characters/Sampo.png") },
    { id: 31, name: "Seele", image: require("../../assets/images/Characters/Seele.png") },
    { id: 32, name: "Serval", image: require("../../assets/images/Characters/Serval.png") },
    { id: 33, name: "Silver Wolf", image: require("../../assets/images/Characters/SilverWolf.png") },
    { id: 34, name: "Sushang", image: require("../../assets/images/Characters/Sushang.png") },
    { id: 35, name: "Tingyun", image: require("../../assets/images/Characters/Tingyun.png") },
    { id: 36, name: "Topaz & Numby", image: require("../../assets/images/Characters/Topaz.png") },
    { id: 37, name: "Welt", image: require("../../assets/images/Characters/Welt.png") },
    { id: 38, name: "Xueyi", image: require("../../assets/images/Characters/Xueyi.png") },
    { id: 39, name: "Yanqing", image: require("../../assets/images/Characters/Yanqing.png") },
    { id: 40, name: "Yukong", image: require("../../assets/images/Characters/Yukong.png") },
    { id: 41, name: "Trailblazer (Physical)", image: require("../../assets/images/Characters/Trailblazer(Physical).png") },
    { id: 42, name: "Trailblazer (Preservation)", image: require("../../assets/images/Characters/Trailblazer(Preservation).png") },
  ];

  // ====================================================================
  // 2. LIGHTCONES
  // ====================================================================
  const lightconesData: SelectItem[] = [
    { id: 1, name: "A Secret Vow", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Adversarial", image: require("../../assets/images/sample.png") },
    { id: 3, name: "An Instant Before A Gaze", image: require("../../assets/images/sample.png") },
    { id: 4, name: "Before Dawn", image: require("../../assets/images/sample.png") },
    { id: 5, name: "But the Battle Isnt Over", image: require("../../assets/images/sample.png") },
    { id: 6, name: "Carve the Moon, Weave the Clouds", image: require("../../assets/images/sample.png") },
    { id: 7, name: "Cruising in the Stellar Sea", image: require("../../assets/images/sample.png") },
    { id: 8, name: "Dance! Dance! Dance!", image: require("../../assets/images/sample.png") },
    { id: 9, name: "Day One of My New Life", image: require("../../assets/images/sample.png") },
    { id: 10, name: "Echoes of the Coffin", image: require("../../assets/images/sample.png") },
    { id: 11, name: "Eyes of the Prey", image: require("../../assets/images/sample.png") },
    { id: 12, name: "Geniuses Repose", image: require("../../assets/images/sample.png") },
    { id: 13, name: "Good Night and Sleep Well", image: require("../../assets/images/sample.png") },
    { id: 14, name: "I Shall Be My Own Sword", image: require("../../assets/images/sample.png") },
    { id: 15, name: "In the Name of the World", image: require("../../assets/images/sample.png") },
    { id: 16, name: "In the Night", image: require("../../assets/images/sample.png") },
    { id: 17, name: "Incessant Rain", image: require("../../assets/images/sample.png") },
    { id: 18, name: "Landaus Choice", image: require("../../assets/images/sample.png") },
    { id: 19, name: "Memories of the Past", image: require("../../assets/images/sample.png") },
    { id: 20, name: "Meshing Cogs", image: require("../../assets/images/sample.png") },
    { id: 21, name: "Moment of Victory", image: require("../../assets/images/sample.png") },
    { id: 22, name: "Multiplication", image: require("../../assets/images/sample.png") },
    { id: 23, name: "Night on the Milky Way", image: require("../../assets/images/sample.png") },
    { id: 24, name: "On the Fall of an Aeon", image: require("../../assets/images/sample.png") },
    { id: 25, name: "Only Silence Remains", image: require("../../assets/images/sample.png") },
    { id: 26, name: "Past Self in Mirror", image: require("../../assets/images/sample.png") },
    { id: 27, name: "Patience Is All You Need", image: require("../../assets/images/sample.png") },
    { id: 28, name: "Planetary Rendezvous", image: require("../../assets/images/sample.png") },
    { id: 29, name: "Post-Op Conversation", image: require("../../assets/images/sample.png") },
    { id: 30, name: "Quid Pro Quo", image: require("../../assets/images/sample.png") },
    { id: 31, name: "Resolution Shines As Pearls of Sweat", image: require("../../assets/images/sample.png") },
    { id: 32, name: "Shared Feeling", image: require("../../assets/images/sample.png") },
    { id: 33, name: "She Already Shut Her Eyes", image: require("../../assets/images/sample.png") },
    { id: 34, name: "Sleep Like the Dead", image: require("../../assets/images/sample.png") },
    { id: 35, name: "Something Irreplaceable", image: require("../../assets/images/sample.png") },
    { id: 36, name: "Swordplay", image: require("../../assets/images/sample.png") },
    { id: 37, name: "Texture of Memories", image: require("../../assets/images/sample.png") },
    { id: 38, name: "The Moles Welcome You", image: require("../../assets/images/sample.png") },
    { id: 39, name: "The Seriousness of Breakfast", image: require("../../assets/images/sample.png") },
    { id: 40, name: "The Unreachable Side", image: require("../../assets/images/sample.png") },
    { id: 41, name: "Time Waits for No One", image: require("../../assets/images/sample.png") },
    { id: 42, name: "Today is Another Peaceful Day", image: require("../../assets/images/sample.png") },
    { id: 43, name: "Under the Blue Sky", image: require("../../assets/images/sample.png") },
  ];

  // ====================================================================
  // 3. CAVERN RELIC SETS (4-Piece)
  // ====================================================================
  const relicSetData: SelectItem[] = [
    { id: 1, name: "Band of Sizzling Thunder", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Champion of Streetwise Boxing", image: require("../../assets/images/sample.png") },
    { id: 3, name: "Eagle of Twilight Line", image: require("../../assets/images/sample.png") },
    { id: 4, name: "Firesmith of Lava-Forging", image: require("../../assets/images/sample.png") },
    { id: 5, name: "Genius of Brilliant Stars", image: require("../../assets/images/sample.png") },
    { id: 6, name: "Guard of Wuthering Snow", image: require("../../assets/images/sample.png") },
    { id: 7, name: "Hunter of Glacial Forest", image: require("../../assets/images/sample.png") },
    { id: 8, name: "Knight of Purity Palace", image: require("../../assets/images/sample.png") },
    { id: 9, name: "Longevous Disciple", image: require("../../assets/images/sample.png") },
    { id: 10, name: "Messenger Traversing Hackerspace", image: require("../../assets/images/sample.png") },
    { id: 11, name: "Musketeer of Wild Wheat", image: require("../../assets/images/sample.png") },
    { id: 12, name: "Passerby of Wandering Cloud", image: require("../../assets/images/sample.png") },
    { id: 13, name: "Prisoner in Deep Confinement", image: require("../../assets/images/sample.png") },
    { id: 14, name: "The Ashblazing Grand Duke", image: require("../../assets/images/sample.png") },
    { id: 15, name: "Wastelander of Banditry Desert", image: require("../../assets/images/sample.png") },
  ];

  // ====================================================================
  // 4. PLANAR ORNAMENT SETS (2-Piece)
  // ====================================================================
  const planarSetData: SelectItem[] = [
    { id: 1, name: "Belobog of the Architects", image: require("../../assets/images/sample.png") },
    { id: 2, name: "Broken Keel", image: require("../../assets/images/sample.png") },
    { id: 3, name: "Celestial Differentiator", image: require("../../assets/images/sample.png") },
    { id: 4, name: "Firmament Frontline: Glamoth", image: require("../../assets/images/sample.png") },
    { id: 5, name: "Fleet of the Ageless", image: require("../../assets/images/sample.png") },
    { id: 6, name: "Inert Salsotto", image: require("../../assets/images/sample.png") },
    { id: 7, name: "Pan-Cosmic Commercial Enterprise", image: require("../../assets/images/sample.png") },
    { id: 8, name: "Penacony, Land of the Dreams", image: require("../../assets/images/sample.png") },
    { id: 9, name: "Rutilant Arena", image: require("../../assets/images/sample.png") },
    { id: 10, name: "Space Sealing Station", image: require("../../assets/images/sample.png") },
    { id: 11, name: "Sprightly Vonwacq", image: require("../../assets/images/sample.png") },
    { id: 12, name: "Talia: Kingdom of Banditry", image: require("../../assets/images/sample.png") },
  ];

  // ====================================================================

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
    setOpenDropdown(null);
    setOpenSelectTab(context);
  };

  const handleChoose = (item: SelectItem, context: "characters" | "lightcones" | "relicSet" | "planarSet") => {
    // 1. Cập nhật mảng characters (Dùng cho vòng tròn phía trên và Timeline)
    if (context === "characters") {
      const newChars = [...characters]; // Clone mảng cũ
      newChars[currentChar - 1] = item.name;
      setCharacters(newChars);
    }

    // 2. Cập nhật object characterData (Dùng cho các nút bấm bên dưới)
    setCharacterData(prev => ({
      ...prev,
      [currentChar]: {
        ...prev[currentChar],
        ...(context === "lightcones" && { lightcone: item.name }),
        ...(context === "relicSet" && { [relicSelectingSlot]: item.name }),
        ...(context === "planarSet" && { planarSet: item.name }),
      }
    }));

    setOpenSelectTab(null);
  };

  const actions = React.useMemo(() => {
    const DEFAULT_SPD = 100;
    const totalAvLimit = 150 + cycle * 100;
    let allActions: { charIndex: number; name: string; av: number }[] = [];

    [1, 2, 3, 4].forEach((idx) => {
      const charName = characters[idx - 1];
      if (!charName || charName === "") return; // Chỉ tính nếu đã chọn nhân vật

      const rawSpd = parseFloat(characterData[idx].spd);
      const spd = isNaN(rawSpd) || rawSpd <= 0 ? DEFAULT_SPD : rawSpd;

      const actionInterval = 10000 / spd;
      let accumulatedAv = actionInterval;

      while (accumulatedAv <= totalAvLimit) {
        allActions.push({
          charIndex: idx,
          name: charName,
          av: accumulatedAv,
        });
        accumulatedAv += actionInterval;
      }
    });

    return allActions.sort((a, b) => a.av - b.av);
  }, [characters, characterData, cycle]); // Tự động chạy lại khi các giá trị này đổi

  const totalAvLimit = 150 + cycle * 100;

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
                  testID={`character-slot-${i}`}
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
                testID="relic-2-button"
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
              onFocus={() => {
                setOpenDropdown(null);      // đóng dropdown
                setOpenSelectTab(null);     // đóng select tab
              }}
              onChangeText={(val) =>
                setCharacterData({
                  ...characterData,
                  [currentChar]: {
                    ...characterData[currentChar],
                    spd: val,
                  },
                })
              }
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-col px-3 mt-5">
          <View className="flex-row justify-between">
            <TouchableOpacity className="px-6 py-2 bg-[#c7c29b] rounded-xl flex-row items-center" onPress={() => router.replace("/home/layout")}>
              <Text className="font-medium text-lg mr-2">Preset</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-8 py-2 bg-[#c7c29b] rounded-xl" onPress={() => router.replace("/home/save")}>
              <Text className="font-medium text-lg">Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === TIMELINE === */}
        <View className="mt-12 mb-20 items-center w-full px-8">
          <View className="w-full h-[3px] bg-white/60 rounded-full relative items-center justify-center">
            
            {/* Vạch mốc khởi đầu */}
            <View className="absolute left-0 w-[2px] h-4 bg-white" />
            
            {/* Vòng lặp hiển thị các điểm hành động */}
            {actions.map((action, index) => {
              const position = (action.av / totalAvLimit) * 100;
              
              // Kiểm tra xem có ai hành động cùng lúc (trùng AV) không
              const isDuplicateAV = index > 0 && Math.abs(actions[index - 1].av - action.av) < 0.1;
              if (isDuplicateAV) return null; // Bỏ qua lượt này vì sẽ hiển thị gộp ở lượt trước

              // Tìm tất cả nhân vật tại mốc AV này
              const charsAtThisPoint = actions.filter(a => Math.abs(a.av - action.av) < 0.1);
              
              return (
                <View 
                  key={`point-${index}`} 
                  className="absolute items-center" 
                  style={{ left: `${position}%` }}
                >
                  {/* Điểm chấm trên thanh */}
                  <View className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-[#59659A] z-10" />

                  {/* Render các nhân vật tại điểm này */}
                  {charsAtThisPoint.map((char, charIdx) => {
                    // Logic: 2 người đầu ở trên, người thứ 3-4 ở dưới
                    const isTop = charIdx < 2; 
                    const offset = isTop ? -45 - (charIdx * 35) : 15 + ((charIdx - 2) * 35);

                    return (
                      <View 
                        key={`char-${char.charIndex}-${charIdx}`}
                        className="absolute items-center w-12"
                        style={{ top: offset }}
                      >
                        <View className="bg-[#c7c29b] w-10 h-10 rounded-full items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                          <Text className="text-[10px] font-bold text-[#59659A]">
                            {char.name.split(' ').map(n => n[0]).join('')}
                          </Text>
                        </View>
                        {/* Chỉ hiện AV ở icon gần thanh nhất để tránh rối */}
                        {(charIdx === 0 || charIdx === 2) && (
                          <Text className="text-white text-[8px] font-bold mt-1 bg-black/30 px-1 rounded">
                            {Math.round(char.av)}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            })}

            {/* Vạch mốc kết thúc */}
            <View className="absolute right-0 w-[2px] h-4 bg-white" />
          </View>
          
          <View className="flex-row justify-between w-full mt-2">
            <Text className="text-white/50 text-[10px]">0 AV</Text>
            <Text className="text-white/50 text-[10px]">{totalAvLimit} AV (Max)</Text>
          </View>
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
