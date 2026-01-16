import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Iconify } from 'react-native-iconify';

interface CalendarHeaderProps {
  month?: string;
  addMonth?: () => void;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({ month }) => {
  if (!month) return null;

  // Parse the month string (format: "YYYY-MM-DD")
  const date = new Date(month);
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return (
    <View className="flex-row items-center gap-2 justify-center py-4">
      <Iconify icon="basil:calendar-outline" size={22} />
      <Text className="text-xl font-medium text-gray-900">
        {monthName}, {year}
      </Text>
    </View>
  );
};