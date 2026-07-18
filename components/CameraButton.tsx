import React from 'react';
import { Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CameraButtonProps {
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function CameraButton({ 
  onPress, 
  iconName, 
  color = '#ffffff', 
  size = 32, 
  style,
  disabled = false 
}: CameraButtonProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        disabled && styles.disabled,
        pressed && styles.pressed,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
