import { useState } from 'react';
import { DateData } from 'react-native-calendars';

export const useCalendar = (initialDate: string = new Date().toISOString().split('T')[0]) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);

  const handleDateChanged = (date: string) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (month: DateData) => {
    console.log('Month changed:', month);
  };

  return {
    selectedDate,
    handleDateChanged,
    handleMonthChange,
  };
};