import { useRouter } from "expo-router";
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MiniProfileProps {
  onClose: () => void;
}

export default function MiniProfile({ onClose }: MiniProfileProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/auth/login");
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.dropdown}>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Chỉnh sửa WIP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Premium!! WIP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => handleLogin()}>
          <Text style={styles.itemText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 60, // ngay dưới navbar
    right: 0,
    width: width * 0.4,
    backgroundColor: 'transparent',
    zIndex: 9,
  },
  dropdown: {
    backgroundColor: '#59659A',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
});
