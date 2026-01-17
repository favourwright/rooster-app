import React from 'react';
import { View, Text } from 'react-native';

interface TagProps {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'primary' }) => {
  const bgColor = variant === 'primary' ? 'bg-blue-100' : 'bg-purple-100';
  const textColor = variant === 'primary' ? 'text-blue-600' : 'text-purple-600';
  
  return (
    <View className={`${bgColor} px-3 py-1 rounded-full`}>
      <Text className={`${textColor} text-xs font-medium`}>{label}</Text>
    </View>
  );
};