import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { AgendaItemProps } from '@/types/calendar';

export const AgendaItem: FC<AgendaItemProps> = ({ item }) => {
  return (
    <View className="flex-row border-b border-gray-200 bg-white p-5">
      <View className="justify-center">
        <View className="w-16">
          <Text className="text-xs text-gray-600">{item.hour}</Text>
        </View>
      </View>
      <View className="ml-4 flex-1">
        <View className="mb-1">
          <Text className="text-base font-semibold text-gray-900">
            {item.title}
          </Text>
        </View>
        {item.duration && (
          <View className="mt-1">
            <Text className="text-xs text-gray-500">{item.duration}</Text>
          </View>
        )}
      </View>
    </View>
  );
};