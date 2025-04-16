import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
};

export default function ActionButton({ label, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.button,]} onPress={onPress}>
      {icon && <Ionicons name={icon} size={20} />}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginBottom: 5,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    
  },
});
