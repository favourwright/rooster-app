import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CalendarDayProps } from '@/types/calendar';
import { twMerge } from 'tailwind-merge'

export const CalendarDay: FC<CalendarDayProps> = ({ 
  date, 
  state, 
  marking, 
  onPress 
}) => {
  const isToday = state === 'today';
  const isSelected = state === 'selected';
  const isDisabled = state === 'disabled';

  const dayName = date?.dateString 
    ? new Date(date.dateString).toLocaleDateString('en-US', { weekday: 'short' })
    : '';

  return (
    <Pressable
      onPress={() => date && onPress?.(date)}
      disabled={isDisabled}
      className={twMerge(
        'items-center justify-between gap-1.5 p-2 pb-4 rounded-full',
        isDisabled ? 'opacity-40' : '',
        isToday ? 'bg-[#F3F4F6]' : '',
        isSelected && 'bg-[#F3F4F6]',
      )}
    >
      {/* Day Number */}
      <View
        className={twMerge(
          'h-10 w-10 items-center justify-center rounded-full',
          isSelected ? 'bg-[#5653FC]' : '',
          isToday && !isSelected ? 'bg-[#5653FC]/10' : ''
        )}
      >
        <Text
          className={`text-xl ${
            isSelected
              ? 'text-white font-bold'
              : isToday
              ? 'text-[#5653FC] font-bold'
              : isDisabled
              ? 'text-gray-600'
              : 'text-gray-900'
          }`}
        >
          {date?.day}
        </Text>
      </View>
      
      {/* Day Name */}
      <View className='relative items-center'>
        <Text
          className={twMerge(
            'text-base font-semibold text-gray-400',
            isSelected && 'text-gray-600'
          )}
        >
          {dayName}
        </Text>
        {/* Marked indicator dot */}
        {marking?.marked && (
          <View className="size-2 absolute top-full rounded-full bg-[#5653FC]" />
        )}
      </View>
      
    </Pressable>
  );
};