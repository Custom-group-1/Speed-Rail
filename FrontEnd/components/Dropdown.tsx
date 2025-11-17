import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface DropdownProps {
  label: string;
  items: string[];
  value: string;
  onSelect: (item: string) => void;
}

export default function Dropdown({ label, items, value, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mt-5">
      <Text className="text-white text-lg mb-1">{label}</Text>

      {/* Selected Box */}
      <TouchableOpacity
        className="bg-[#c7c29b] rounded-xl px-4 py-2 w-24 flex-row justify-between items-center"
        onPress={() => setOpen(!open)}
      >
        <Text className="text-black">{value}</Text>

        {/* Arrow rotate when open */}
        <Text
          className={`text-black transition-all ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      {open && (
        <View className="bg-[#c7c29b] rounded-xl mt-2 w-24 max-h-48 overflow-hidden">
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-2 border-b border-black/20"
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                <Text className="text-black">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
