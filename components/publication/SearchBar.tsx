import React from 'react';
import { View, TextInput } from 'react-native';
import { Iconify } from 'react-native-iconify';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search publications',
  value,
  onChangeText,
  onSearch
}) => (
  <View className="px-5">
    <View className="flex-row gap-2 items-center border border-gray-200 rounded-xl px-4 py-3">
      <Iconify
        icon='hugeicons:search-01'
        size={23}
        color='gray'
      />
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => onSearch?.(value || '')}
        className="flex-1 text-base leading-tight font-semibold"
        returnKeyType="search"
      />
    </View>
  </View>
);