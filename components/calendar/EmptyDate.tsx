import React, { FC } from 'react';
import { View, Text } from 'react-native';

export const EmptyDate: FC = () => {
  return (
    <View className="flex-1 px-5 pt-8 pb-20">
      <Text className="text-sm italic text-gray-400">No events scheduled</Text>
    </View>
  );
};