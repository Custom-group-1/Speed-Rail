import React, { useRef, useState } from "react";
import { FlatList, LayoutRectangle, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DropdownProps {
  items: string[];
  value: string;
  onSelect: (item: string) => void;
  width?: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Dropdown({ items, value, onSelect, width = 80, isOpen, onToggle }: DropdownProps) {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const dropdownRef = useRef<View>(null);

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <TouchableOpacity
          ref={dropdownRef}
          onLayout={(e) => setLayout(e.nativeEvent.layout)}
          onPress={onToggle}   // dùng callback từ cha
          style={[
            styles.button,
            { width },
            isOpen && {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        >
          <Text className="font-medium">{value}</Text>
          <Text className={`text-base ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</Text>
        </TouchableOpacity>
      </View>

      {isOpen && layout && (
        <View
          style={[
            styles.dropdown,
            {
              width,
              top: layout.y,
              left: layout.x + layout.width,
              borderTopLeftRadius: 0,
            },
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = item === value;
              return (
                <TouchableOpacity
                  style={[styles.item, isSelected && { backgroundColor: "#7B8BA6" }]}
                  onPress={() => {
                    onSelect(item);
                    onToggle(); // đóng dropdown
                  }}
                >
                  <Text style={{ color: isSelected ? "#fff" : "#000" }}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c7c29b",
    borderRadius: 16,
    height: 40,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#BDCCDE",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    maxHeight: 400,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  item: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
  },
});
