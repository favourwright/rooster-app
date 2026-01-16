import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

interface CalendarArrowProps {
  direction?: 'left' | 'right';
  onPress?: () => void;
  disabled?: boolean;
}

export const CalendarArrow: FC<CalendarArrowProps> = ({ 
  direction, 
  onPress,
  disabled 
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`h-10 w-10 items-center justify-center rounded-full ${
        disabled ? 'opacity-30' : 'active:bg-gray-100'
      }`}
    >
      <View className="items-center justify-center">
        <Text className="text-2xl font-bold text-orange-500">
          {direction === 'left' ? '‹' : '›'}
        </Text>
      </View>
    </Pressable>
  );
};