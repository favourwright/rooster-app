import React, { useState, FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { 
  CalendarProvider, 
  ExpandableCalendar, 
  AgendaList,
  DateData 
} from 'react-native-calendars';

// Types
interface AgendaItem {
  hour: string;
  title: string;
  duration?: string;
}

interface AgendaSection {
  title: string;
  data: AgendaItem[];
}

type DayState = 'disabled' | 'today' | 'selected' | 'inactive' | '';

interface CalendarDayProps {
  date?: DateData;
  state?: DayState;
  marking?: any;
  onPress?: (date: DateData) => void;
}

interface AgendaItemProps {
  item: AgendaItem;
}

// Custom Calendar Day Component
const CalendarDay: FC<CalendarDayProps> = ({ date, state, marking, onPress }) => {
  const isToday = state === 'today';
  const isSelected = state === 'selected';
  const isDisabled = state === 'disabled';

  // Get day name (Sun, Mon, etc.)
  const dayName = date?.dateString 
    ? new Date(date.dateString).toLocaleDateString('en-US', { weekday: 'short' })
    : '';

  return (
    <Pressable
      onPress={() => date && onPress?.(date)}
      disabled={isDisabled}
      className={`h-20 items-center justify-center ${
        isDisabled ? 'opacity-30' : ''
      }`}
    >
      {/* Day Name */}
      <Text className="mb-2 text-xs font-semibold uppercase text-gray-500">
        {dayName}
      </Text>
      
      {/* Day Number */}
      <View
        className={`h-10 w-10 items-center justify-center rounded-full ${
          isSelected ? 'bg-blue-500' : isToday ? 'bg-blue-100' : ''
        }`}
      >
        <Text
          className={`text-base ${
            isSelected
              ? 'text-white font-bold'
              : isToday
              ? 'text-blue-600 font-bold'
              : isDisabled
              ? 'text-gray-300'
              : 'text-gray-900'
          }`}
        >
          {date?.day}
        </Text>
      </View>
      
      {/* Marked indicator dot */}
      {marking?.marked && (
        <View className="mt-1 h-1 w-1 rounded-full bg-blue-500" />
      )}
    </Pressable>
  );
};

// Agenda Item Component
const AgendaItemComponent: FC<AgendaItemProps> = ({ item }) => {
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

// Empty Date Component
const EmptyDate: FC = () => {
  return (
    <View className="flex-1 px-5 pt-8 pb-20">
      <Text className="text-sm italic text-gray-400">No events scheduled</Text>
    </View>
  );
};

// Main Component
const ExpandableCalendarExample: FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-16');
  
  // Sample agenda items - grouped by date
  const agendaItems: AgendaSection[] = [
    {
      title: '2026-01-15',
      data: [
        { hour: '9:00 AM', title: 'Team Meeting', duration: '1h' },
        { hour: '2:00 PM', title: 'Project Review', duration: '30min' }
      ]
    },
    {
      title: '2026-01-16',
      data: [
        { hour: '10:00 AM', title: 'Client Call', duration: '45min' },
        { hour: '3:00 PM', title: 'Design Sprint', duration: '2h' }
      ]
    },
    {
      title: '2026-01-17',
      data: [
        { hour: '11:00 AM', title: 'Lunch with Sarah', duration: '1h' }
      ]
    },
    {
      title: '2026-01-18',
      data: []
    },
    {
      title: '2026-01-19',
      data: [
        { hour: '9:30 AM', title: 'Standup', duration: '15min' },
        { hour: '1:00 PM', title: 'Code Review', duration: '1h' },
        { hour: '4:00 PM', title: 'Team Sync', duration: '30min' }
      ]
    },
    {
      title: '2026-01-20',
      data: [
        { hour: '10:00 AM', title: 'Workshop', duration: '3h' }
      ]
    },
  ];

  // Mark dates that have events
  const markedDates = {
    '2026-01-15': { marked: true },
    '2026-01-16': { marked: true },
    '2026-01-17': { marked: true },
    '2026-01-19': { marked: true },
    '2026-01-20': { marked: true },
  };

  const handleDateChanged = (date: string) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (month: DateData) => {
    console.log('Month changed:', month);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <CalendarProvider
        date={selectedDate}
        onDateChanged={handleDateChanged}
        onMonthChange={handleMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#3b82f6',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#3b82f6',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#3b82f6',
            selectedDotColor: '#ffffff',
            arrowColor: '#f97316',
            monthTextColor: '#3b82f6',
            indicatorColor: '#3b82f6',
          }}
          firstDay={1}
          markedDates={markedDates}
          style={{ height: 120 }}
          // Hide default day names
          hideDayNames={true}
          // Hide the knob (expand/collapse indicator)
          hideKnob={true}
          // Use custom day component that includes day names
          disablePan={true}
          dayComponent={CalendarDay}
        />
        
        <AgendaList
          sections={agendaItems}
          renderItem={({ item }: { item: AgendaItem }) => (
            <AgendaItemComponent item={item} />
          )}
        />
      </CalendarProvider>
    </View>
  );
};

export default ExpandableCalendarExample;