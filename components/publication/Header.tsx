import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = 'back', 
  userAvatar,
  onProfilePress 
}) => (
  <View className="flex-row items-center justify-between px-5">
    <View className='gap-1'>
      <Text className="text-2xl font-bold">Welcome {userName} 👋</Text>
      <Text className="font-medium text-gray-500">Start exploring publications</Text>
    </View>
    <TouchableOpacity 
      onPress={onProfilePress}
      className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden"
    >
      {userAvatar ? (
        <Image 
          source={{ uri: userAvatar }}
          className="w-full h-full"
        />
      ) : (
        <View className="w-full h-full bg-gray-300 items-center justify-center">
          <Text className="text-gray-600 text-lg">👤</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);