import React from 'react';
import { View, Text, Image } from 'react-native';

interface Author {
  name: string;
  avatar: string;
  date: string;
  readTime: string;
}

interface AuthorInfoProps {
  author: Author;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => (
  <View className="flex-row items-center">
    <Image 
      source={{ uri: author.avatar }}
      className="w-10 h-10 rounded-full"
    />
    <View className="ml-3 flex-1">
      <Text className="font-semibold text-sm">{author.name}</Text>
      <View className="flex-row items-center mt-0.5">
        <Text className="text-gray-500 text-xs">{author.date}</Text>
        <View className="w-1 h-1 rounded-full bg-gray-400 mx-2" />
        <Text className="text-gray-500 text-xs">{author.readTime}</Text>
      </View>
    </View>
  </View>
);