import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export interface SelectItem {
  id: number;
  name: string;
  image: any;
}

interface SelectTabProps {
  context: "characters" | "lightcones" | "relicSet" | "planarSet";
  items: SelectItem[];
  onClose: () => void;
  onChoose: (item: SelectItem, context: "characters" | "lightcones" | "relicSet" | "planarSet") => void;
}

export default function SelectTab({ onClose, onChoose, context, items }: SelectTabProps) {
  // 1. Khởi tạo vị trí bắt đầu là chiều cao màn hình (ẩn dưới đáy)
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    setSelectedItem(null); 
  }, [context]);

  useEffect(() => {
    // 2. Hiệu ứng trượt lên dùng spring cho mượt
    Animated.spring(slideAnim, {
      toValue: 0, // Trượt về vị trí gốc (sát đáy)
      useNativeDriver: true, // Đã hỗ trợ vì dùng translateY
      tension: 50,
      friction: 10,
    }).start();
  }, []);

  const closeTab = () => {
    // 3. Trượt xuống trước khi đóng
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const getTitle = () => {
    switch(context) {
      case "characters": return "Select Character";
      case "lightcones": return "Select Lightcone";
      case "relicSet": return "Select Relic Set";
      case "planarSet": return "Select Planar Set";
      default: return "";
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={closeTab} 
      />

      {/* 4. Thay đổi style top thành transform translateY */}
      <Animated.View style={[
        styles.panel, 
        { transform: [{ translateY: slideAnim }] }
      ]}>
        <View style={styles.handle} />
        <Text style={styles.title}>{getTitle()}</Text>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemBox, selectedItem === item.id && styles.itemBoxSelected]}
                onPress={() => setSelectedItem(item.id)}
              >
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.itemBoxEmpty} />
          </View>
        </ScrollView>

        {/* Nút Choose luôn nằm trong Panel */}
        <TouchableOpacity
          style={[styles.chooseButton, selectedItem === null && { opacity: 0.5 }]}
          disabled={selectedItem === null}
          onPress={() => {
            if (selectedItem !== null) {
              const item = items.find((i) => i.id === selectedItem);
              if (item) onChoose(item, context);
              closeTab();
            }
          }}
        >
          <Text style={styles.chooseText}>Choose</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  panel: {
    // Fix: Dùng bottom: 0 và height cố định để nút Choose không bị lẹm
    backgroundColor: "#59659A",
    width: "100%",
    height: SCREEN_HEIGHT * 0.8, 
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30, // Đảm bảo nút không quá sát cạnh dưới
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemBox: {
    width: "48%",
    backgroundColor: "#727dad",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  itemBoxSelected: {
    backgroundColor: "#292E53",
    borderWidth: 2,
    borderColor: "#C7B775",
  },
  itemBoxEmpty: {
    width: "48%",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemText: {
    color: "white",
    fontSize: 14,
  },
  chooseButton: {
    backgroundColor: "#C7B775",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  chooseText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});