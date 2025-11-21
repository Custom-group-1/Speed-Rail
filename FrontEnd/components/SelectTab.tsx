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
const SCREEN_WIDTH = Dimensions.get("window").width;

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
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    setSelectedItem(null); // reset khi đổi context
  }, [context]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT * 0.12,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, []);

  const closeTab = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: false,
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
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeTab} />

      <Animated.View style={[styles.panel, { top: slideAnim }]}>
        <Text style={styles.title}>{getTitle()}</Text>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.grid}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemBox, selectedItem === item.id && styles.itemBoxSelected]}
                onPress={() => setSelectedItem(item.id)}
              >
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.itemBoxEmpty} />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.chooseButton}
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
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  panel: {
    position: "absolute",
    height: SCREEN_HEIGHT * 0.9,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: "#59659A",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
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
  },
  itemBoxEmpty: {
    width: "48%",
    marginBottom: 14,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemText: {
    color: "white",
    fontSize: 15,
  },
  chooseButton: {
    backgroundColor: "#C7B775",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 6,
  },
  chooseText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
});
