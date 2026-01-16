import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AgendaItem as AgendaItemType } from '@/types/calendar';
import ProfileDetails from '@/components/user/ProfileDetails';

type AgendaItemProps = {
  item: AgendaItemType
  onPress?: () => void;
}

export const AgendaItem: FC<AgendaItemProps> = ({ item, onPress }) => {
  return (
    <View className="flex-row items-start bg-white p-3 px-6">
      <View className="justify-center">
        <View className="w-16">
          <Text className="text-lg text-gray-600 leading-none">{item.hour}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        className="flex-1 p-2 rounded-lg border-l-2 gap-4"
        style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-900">
            {item.title}
          </Text>
          <Text className="text-base font-semibold" style={{ color: item.color }}>
            {item.duration}
          </Text>
        </View>

        <ProfileDetails
          name={item.team?.[0]?.name}
          isAvailable={item.team?.[0]?.isAvailable}
        />
      </TouchableOpacity>
    </View>
  );
};