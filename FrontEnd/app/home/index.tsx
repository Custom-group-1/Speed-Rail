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
    { id: 18, name: "Huohuo", image: require("../../assets/images/Characters/HuoHuo.png") },
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
    { id: 1, name: "A Secret Vow", image: require("../../assets/images/Lightcones/A_Secret_Vow.png") },
    { id: 2, name: "Adversarial", image: require("../../assets/images/Lightcones/Adversarial.png") },
    { id: 3, name: "An Instant Before A Gaze", image: require("../../assets/images/Lightcones/An_Instant_Before_A_Gaze.png") },
    { id: 4, name: "Before Dawn", image: require("../../assets/images/Lightcones/Before_Dawn.png") },
    { id: 5, name: "But the Battle Isnt Over", image: require("../../assets/images/Lightcones/But_the_Battle_Isnt_Over.png") },
    { id: 6, name: "Carve the Moon, Weave the Clouds", image: require("../../assets/images/Lightcones/Carve_the_Moon_Weave_the_Clouds.png") },
    { id: 7, name: "Cruising in the Stellar Sea", image: require("../../assets/images/Lightcones/Cruising_in_the_Stellar_Sea.png") },
    { id: 8, name: "Dance! Dance! Dance!", image: require("../../assets/images/Lightcones/Dance_Dance_Dance.png") },
    { id: 9, name: "Echoes of the Coffin", image: require("../../assets/images/Lightcones/Echoes_of_the_Coffin.png") },
    { id: 10, name: "I Shall Be My Own Sword", image: require("../../assets/images/Lightcones/I_Shall_Be_My_Own_Sword.png") },
    { id: 11, name: "In the Name of the World", image: require("../../assets/images/Lightcones/In_the_Name_of_the_World.png") },
    { id: 12, name: "In the Night", image: require("../../assets/images/Lightcones/In_the_Night.png") },
    { id: 13, name: "Incessant Rain", image: require("../../assets/images/Lightcones/Incessant_Rain.png") },
    { id: 14, name: "Moment of Victory", image: require("../../assets/images/Lightcones/Moment_of_Victory.png") },
    { id: 15, name: "Night on the Milky Way", image: require("../../assets/images/Lightcones/Night_on_the_Milky_Way.png") },
    { id: 16, name: "On the Fall of an Aeon", image: require("../../assets/images/Lightcones/On_the_Fall_of_an_Aeon.png") },
    { id: 17, name: "Past Self in Mirror", image: require("../../assets/images/Lightcones/Past_Self_in_Mirror.png") },
    { id: 18, name: "Patience Is All You Need", image: require("../../assets/images/Lightcones/Patience_Is_All_You_Need.png") },
    { id: 19, name: "She Already Shut Her Eyes", image: require("../../assets/images/Lightcones/She_Already_Shut_Her_Eyes.png") },
    { id: 20, name: "Sleep Like the Dead", image: require("../../assets/images/Lightcones/Sleep_Like_the_Dead.png") },
    { id: 21, name: "Something Irreplaceable", image: require("../../assets/images/Lightcones/Something_Irreplaceable.png") },
    { id: 22, name: "The Unreachable Side", image: require("../../assets/images/Lightcones/The_Unreachable_Side.png") },
    { id: 23, name: "Time Waits for No One", image: require("../../assets/images/Lightcones/Time_Waits_for_No_One.png") },
    { id: 24, name: "Today is Another Peaceful Day", image: require("../../assets/images/Lightcones/Today_Is_Another_Peaceful_Day.png") },
    { id: 25, name: "Under the Blue Sky", image: require("../../assets/images/Lightcones/Under_the_Blue_Sky.png") },
  ];

  // ====================================================================
  // 3. CAVERN RELIC SETS (4-Piece)
  // ====================================================================
  const relicSetData: SelectItem[] = [
    { id: 1, name: "Band of Sizzling Thunder", image: require("../../assets/images/Relic Sets/Band_of_Sizzling_Thunder.png") },
    { id: 2, name: "Champion of Streetwise Boxing", image: require("../../assets/images/Relic Sets/Champion_of_Streetwise_Boxing.png") },
    { id: 3, name: "Eagle of Twilight Line", image: require("../../assets/images/Relic Sets/Eagle_of_Twilight_Line.png") },
    { id: 4, name: "Firesmith of Lava-Forging", image: require("../../assets/images/Relic Sets/Firesmith_of_Lava-Forging.png") },
    { id: 5, name: "Genius of Brilliant Stars", image: require("../../assets/images/Relic Sets/Genius_of_Brilliant_Stars.png") },
    { id: 6, name: "Guard of Wuthering Snow", image: require("../../assets/images/Relic Sets/Guard_of_Wuthering_Snow.png") },
    { id: 7, name: "Hunter of Glacial Forest", image: require("../../assets/images/Relic Sets/Hunter_of_Glacial_Forest.png") },
    { id: 8, name: "Knight of Purity Palace", image: require("../../assets/images/Relic Sets/Knight_of_Purity_Palace.png") },
    { id: 9, name: "Longevous Disciple", image: require("../../assets/images/Relic Sets/Longevous_Disciple.png") },
    { id: 10, name: "Messenger Traversing Hackerspace", image: require("../../assets/images/Relic Sets/Messenger_Traversing_Hackerspace.png") },
    { id: 11, name: "Musketeer of Wild Wheat", image: require("../../assets/images/Relic Sets/Musketeer_of_Wild_Wheat.png") },
    { id: 12, name: "Passerby of Wandering Cloud", image: require("../../assets/images/Relic Sets/Passerby_of_Wandering_Cloud.png") },
    { id: 13, name: "Prisoner in Deep Confinement", image: require("../../assets/images/Relic Sets/Prisoner_in_Deep_Confinement.png") },
    { id: 14, name: "The Ashblazing Grand Duke", image: require("../../assets/images/Relic Sets/The_Ashblazing_Grand_Duke.png") },
    { id: 15, name: "Wastelander of Banditry Desert", image: require("../../assets/images/Relic Sets/Wastelander_of_Banditry_Desert.png") },
  ];

  // ====================================================================
  // 4. PLANAR ORNAMENT SETS (2-Piece)
  // ====================================================================
  const planarSetData: SelectItem[] = [
    { id: 1, name: "Belobog of the Architects", image: require("../../assets/images/Planar/Belobog_of_the_Architects.png") },
    { id: 2, name: "Broken Keel", image: require("../../assets/images/Planar/Broken_Keel.png") },
    { id: 3, name: "Celestial Differentiator", image: require("../../assets/images/Planar/Celestial_Differentiator.png") },
    { id: 4, name: "Firmament Frontline: Glamoth", image: require("../../assets/images/Planar/Firmament_Frontline_Glamoth.png") },
    { id: 5, name: "Fleet of the Ageless", image: require("../../assets/images/Planar/Fleet_of_the_Ageless.png") },
    { id: 6, name: "Inert Salsotto", image: require("../../assets/images/Planar/Inert_Salsotto.png") },
    { id: 7, name: "Pan-Cosmic Commercial Enterprise", image: require("../../assets/images/Planar/Pan-Cosmic_Commercial_Enterprise.png") },
    { id: 8, name: "Penacony, Land of the Dreams", image: require("../../assets/images/Planar/Penacony_Land_of_the_Dreams.png") },
    { id: 9, name: "Rutilant Arena", image: require("../../assets/images/Planar/Rutilant_Arena.png") },
    { id: 10, name: "Space Sealing Station", image: require("../../assets/images/Planar/Space_Sealing_Station.png") },
    { id: 11, name: "Sprightly Vonwacq", image: require("../../assets/images/Planar/Sprightly_Vonwacq.png") },
    { id: 12, name: "Talia: Kingdom of Banditry", image: require("../../assets/images/Planar/Talia_Kingdom_of_Banditry.png") },
  ];

  // ====================================================================
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
    const lowerAvLimit = cycle === 0 ? 0 : 150 + (cycle - 1) * 100;
    const upperAvLimit = 150 + cycle * 100;
    
    let allActions: { charIndex: number; name: string; av: number }[] = [];

    [1, 2, 3, 4].forEach((idx) => {
      const charName = characters[idx - 1];
      if (!charName || charName === "") return;

      const rawSpd = parseFloat(characterData[idx].spd);
      const spd = isNaN(rawSpd) || rawSpd <= 0 ? DEFAULT_SPD : rawSpd;

      const actionInterval = 10000 / spd;
      let accumulatedAv = actionInterval;

      while (accumulatedAv <= upperAvLimit) {
        if (accumulatedAv > lowerAvLimit) {
          allActions.push({
            charIndex: idx,
            name: charName,
            av: accumulatedAv,
          });
        }
        accumulatedAv += actionInterval;
      }
    });

    return allActions.sort((a, b) => a.av - b.av);
  }, [characters, characterData, cycle]);

  // 1. Logic tính toán Actions (Đã tối ưu để gom nhóm)
  const timelineGroups = React.useMemo(() => {
    const DEFAULT_SPD = 100;
    const lowerAvLimit = cycle === 0 ? 0 : 150 + (cycle - 1) * 100;
    const upperAvLimit = 150 + cycle * 100;
    
    let rawActions: { charIndex: number; name: string; av: number; image: any }[] = [];

    // Lấy dữ liệu action thô
    [1, 2, 3, 4].forEach((idx) => {
      const charName = characters[idx - 1];
      if (!charName || charName === "") return;

      const rawSpd = parseFloat(characterData[idx].spd);
      const spd = isNaN(rawSpd) || rawSpd <= 0 ? DEFAULT_SPD : rawSpd;
      const actionInterval = 10000 / spd;
      let accumulatedAv = actionInterval;

      while (accumulatedAv <= upperAvLimit) {
        if (accumulatedAv > lowerAvLimit) {
          rawActions.push({
            charIndex: idx,
            name: charName,
            av: accumulatedAv,
            // Giả sử bạn lấy ảnh từ charactersData, ở đây mình tạm dùng require sample
            image: require("../../assets/images/sample.png") 
          });
        }
        accumulatedAv += actionInterval;
      }
    });

    // Sort theo AV
    rawActions.sort((a, b) => a.av - b.av);

    // GOM NHÓM (CLUSTERING)
    // Nếu 2 action cách nhau < 3 AV (hoặc % tùy ý), gộp chung vào 1 điểm hiển thị
    const groups: { av: number; actions: typeof rawActions }[] = [];
    const GROUP_THRESHOLD = 3; // Độ lệch AV cho phép để coi là "cùng lúc"

    rawActions.forEach(action => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && Math.abs(lastGroup.av - action.av) <= GROUP_THRESHOLD) {
        // Gộp vào nhóm trước
        lastGroup.actions.push(action);
      } else {
        // Tạo nhóm mới
        groups.push({ av: action.av, actions: [action] });
      }
    });

    return groups;
  }, [characters, characterData, cycle]);

  // Hàm tính vị trí % trên thanh ngang
  const getPosition = (av: number) => {
    const startAv = cycle === 0 ? 0 : 150 + (cycle - 1) * 100;
    const endAv = 150 + cycle * 100;
    const range = endAv - startAv;
    return Math.max(0, Math.min(100, ((av - startAv) / range) * 100));
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

            {[1, 2, 3, 4].map((i) => {
              // 1. Lấy tên nhân vật tại vị trí i
              const charName = characters[i - 1];
              
              // 2. Tìm object nhân vật tương ứng trong mảng charactersData để lấy ảnh
              const foundChar = charactersData.find((c) => c.name === charName);

              return (
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
                    className="w-14 h-14 rounded-full bg-white items-center justify-center overflow-hidden" // Thêm overflow-hidden để ảnh bo tròn theo nút
                    onPress={() => handlePress(i)}
                  >
                    {foundChar ? (
                      // TRƯỜNG HỢP CÓ NHÂN VẬT: HIỆN ẢNH TỪ DATA
                      <Image
                        source={foundChar.image}
                        className="w-full h-full" 
                        resizeMode="cover" // Dùng cover để ảnh lấp đầy hình tròn
                      />
                    ) : (
                      // TRƯỜNG HỢP CHƯA CHỌN: HIỆN ẢNH SAMPLE (DẤU CỘNG HOẶC MẶC ĐỊNH)
                      <Image
                        source={require("../../assets/images/sample.png")}
                        className="w-8 h-8"
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
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
                <Text 
                  className="font-medium flex-1" 
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >
                  {characterData[currentChar].relic1 || "Relic 1"}
                </Text>
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
                <Text 
                  className={`${characterData[currentChar].relicSet === "Set 4" ? "font-medium/50" : "font-medium"} flex-1`}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
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

      <View className="flex-1 justify-between w-full pb-8"> 
        
        {/* === 1. BUTTONS === */}
        <View className="flex-col px-3 mt-5 mb-12">
          <View className="flex-row justify-between">
            <TouchableOpacity 
              className="px-6 py-2 bg-[#c7c29b] rounded-xl flex-row items-center" 
              onPress={() => router.replace("/home/layout")}
            >
              <Text className="font-medium text-lg mr-2">Preset</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="px-8 py-2 bg-[#c7c29b] rounded-xl" 
              onPress={() => router.replace("/home/save")}
            >
              <Text className="font-medium text-lg">Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === 2. TIMELINE CONTAINER === */}
        <View className="flex-1 justify-center items-center w-full px-8 z-0">
          
          {/* Thanh ngang (Trục chính) */}
          <View className="w-full h-[4px] bg-white/30 rounded-full relative justify-center">
            {/* Vạch giới hạn Start/End */}
            <View className="absolute left-0 w-[2px] h-4 bg-white/50 -top-1.5" />
            <View className="absolute right-0 w-[2px] h-4 bg-white/50 -top-1.5" />

            {/* Loop qua các Group (Cụm nhân vật cùng AV) */}
            {timelineGroups.map((group, groupIndex) => {
              const position = getPosition(group.av);
              const count = group.actions.length;

              return (
                <View
                  key={`group-${groupIndex}`}
                  className="absolute items-center justify-center w-10"
                  style={{
                    left: `${position}%`,
                    marginLeft: -20, // Căn giữa chính xác (w-10 = 40px -> -20px)
                    top: 0,
                    bottom: 0,
                  }}
                >
                  {/* 1. CHẤM VÀNG (LUÔN CỐ ĐỊNH Ở TÂM) */}
                  <View className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-[#59659A] z-20 shadow-sm" />

                  {/* 2. CÁC NHÂN VẬT TỎA RA TỪ TÂM */}
                  {group.actions.map((action, actionIdx) => {
                    // --- LOGIC XẾP VỊ TRÍ ---
                    let isTop = true;
                    let level = 0;

                    if (count === 1) {
                      // Nếu chỉ 1 người -> Luôn nằm trên
                      isTop = true;
                      level = 0;
                    } else {
                      // So le: Chẵn lên trên, Lẻ xuống dưới
                      isTop = actionIdx % 2 === 0;
                      level = Math.floor(actionIdx / 2);
                    }

                    // Khoảng cách từ tâm chấm vàng đến tâm Avatar
                    const baseDistance = 28; // Khoảng cách tầng 1 (gần nhất)
                    const gap = 42;          // Khoảng cách giữa các tầng
                    const distance = baseDistance + (level * gap);

                    // Logic hiển thị số AV (chỉ hiện cho người ngoài cùng cho đỡ rối)
                    const showAvText = count === 1 || actionIdx >= count - 2;

                    // Tìm ảnh nhân vật
                    const charImg = charactersData.find(c => c.name === action.name)?.image;

                    return (
                      <View
                        key={`char-${actionIdx}`}
                        className="absolute items-center justify-center w-10"
                        style={{
                          height: distance, // Chiều cao view bằng đúng khoảng cách để vẽ đường nối
                          // Nếu ở trên: neo đáy vào tâm (bottom: 50%)
                          // Nếu ở dưới: neo đỉnh vào tâm (top: 50%)
                          bottom: isTop ? "50%" : "auto",
                          top: isTop ? "auto" : "50%",
                        }}
                      >
                        {/* Dây nối (Stem) */}
                        <View className="absolute w-[1px] bg-white/60 h-full" />

                        {/* Avatar Box (Luôn nằm ở đầu mút xa nhất của dây nối) */}
                        <View 
                          className="absolute items-center justify-center"
                          style={{ 
                            // Nếu là top thì Avatar nằm ở đỉnh (top: 0), nếu bottom thì nằm ở đáy
                            top: isTop ? 0 : "auto", 
                            bottom: isTop ? "auto" : 0,
                            transform: [{ translateY: isTop ? -16 : 16 }] // Dịch ra khỏi đầu dây một chút để không đè
                          }}
                        >
                          {/* Vòng tròn Avatar */}
                          <View className="w-9 h-9 bg-[#c7c29b] rounded-full items-center justify-center border border-white shadow-sm overflow-hidden z-30">
                            {charImg ? (
                              <Image source={charImg} className="w-full h-full" resizeMode="cover" />
                            ) : (
                              <Text className="text-[10px] font-bold text-[#59659A]">
                                {action.name.substring(0, 2).toUpperCase()}
                              </Text>
                            )}
                          </View>

                          {/* Số AV (Badge) */}
                          {showAvText && (
                            <View
                              className={`absolute items-center min-w-[24px] z-40 ${
                                isTop ? "top-[-14px]" : "bottom-[-14px]"
                              }`}
                            >
                              <Text className="text-yellow-200 text-[9px] font-bold bg-[#59659A]/90 px-1.5 py-0.5 rounded text-center overflow-hidden">
                                {Math.round(group.av)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>

          {/* Text Start/End Cycle */}
          <View className="flex-row justify-between w-full mt-24">
            <View className="items-start">
              <Text className="text-white/40 text-[10px] font-bold">START</Text>
              <Text className="text-white/70 text-[11px]">
                {cycle === 0 ? 0 : 150 + (cycle - 1) * 100}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-white/40 text-[10px] font-bold">CYCLE {cycle} END</Text>
              <Text className="text-white/70 text-[11px]">{150 + cycle * 100}</Text>
            </View>
          </View>
        </View>

        {/* === 3. CYCLE BOX === */}
        <View className="items-center">
          <View className="flex-row items-center justify-center bg-[#c7c29b] rounded-2xl px-6 py-1 w-[40%] ">
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
