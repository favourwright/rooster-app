import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Tag } from './Tag';
import { AuthorInfo } from './AuthorInfo';

export interface Publication {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    date: string;
    readTime: string;
  };
}

interface PublicationCardProps {
  publication: Publication;
  onPress?: (publication: Publication) => void;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ 
  publication, 
  onPress 
}) => (
  <TouchableOpacity 
    onPress={() => onPress?.(publication)}
    className="border border-gray-200 rounded-2xl overflow-hidden p-4 gap-4"
    activeOpacity={0.7}
  >
    <Image 
      source={{ uri: publication.image }}
      className="w-full h-48 rounded-lg"
      resizeMode="cover"
    />
    <View className="flex-row gap-2">
      {publication.tags.map((tag, index) => (
        <Tag 
          key={index} 
          label={tag} 
          variant={index === 0 ? 'primary' : 'secondary'} 
        />
      ))}
    </View>
    <View>
      <Text className="text-lg font-semibold mb-1">{publication.title}</Text>
      <Text className="text-gray-600 text-sm leading-5">
        {publication.description}
      </Text>
    </View>
    <AuthorInfo author={publication.author} />
  </TouchableOpacity>
);