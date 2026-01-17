import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { 
  CalendarProvider, 
  ExpandableCalendar,
  AgendaList,
} from 'react-native-calendars';
import { CalendarDay } from '@/components/calendar/CalendarDay';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { AgendaItem } from '@/components/calendar/AgendaItem';
import { CurrentTimeIndicator } from '@/components/calendar/CurrentTimeIndicator';
import { useAgendaWithTimeMarker } from '@/hooks/useAgendaWithTimeMarker';
import { useCalendar } from '@/hooks/useCalendar';
import { CALENDAR_THEME, CALENDAR_HEIGHT } from '@/constants/calendar';
import { MOCK_AGENDA_ITEMS, MOCK_MARKED_DATES } from '@/data/mockAgendaData';
import { AgendaItem as AgendaItemType } from '@/types/calendar';
import { Iconify } from 'react-native-iconify';
import { useNavigation } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AgendaDetailsModal } from '@/components/calendar/AgendaDetailsModal';

export default function RoosterScreen() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => null,
      headerLeft: () => (
        <Text className='text-2xl font-bold ml-6'>Mijn rooster</Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          className='items-center justify-center size-10 border border-black/10 rounded-lg mr-6'
        >
          <Iconify
            icon='heroicons:ellipsis-vertical'
            size={24}
            color='black'
          />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const { 
    selectedDate, 
    handleDateChanged, 
    handleMonthChange
  } = useCalendar(new Date().toISOString().split('T')[0]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  
  const [selectedAgendaItem, setSelectedAgendaItem] = useState<AgendaItemType | undefined>(undefined);
  const handleEventPress = useCallback((item: AgendaItemType) => {
    setSelectedAgendaItem(item);
    bottomSheetModalRef.current?.present();
  }, []);

  // Check if selected date is today to show time indicator
  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  
  // Insert time marker into agenda data (only for selected date)
  const sectionsWithMarker = useAgendaWithTimeMarker(MOCK_AGENDA_ITEMS, selectedDate, isToday);

  return (
    <>
      <View className="flex-1">
        <CalendarProvider
          date={selectedDate}
          onDateChanged={handleDateChanged}
          onMonthChange={handleMonthChange}
          showTodayButton
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            theme={CALENDAR_THEME}
            firstDay={1}
            markedDates={MOCK_MARKED_DATES}
            hideDayNames={true}
            hideKnob={true}
            style={{ height: CALENDAR_HEIGHT }}
            headerStyle={{ paddingLeft: 0, paddingRight: 0 }}
            disablePan={true}
            dayComponent={CalendarDay}
            renderHeader={(date) => <CalendarHeader month={date} />}
            renderArrow={(direction: string) => (
              <CalendarArrow direction={direction as 'left' | 'right'} />
            )}
          />
          
          <AgendaList
            sections={sectionsWithMarker}
            renderSectionHeader={() => (
              <View className="flex-row justify-between items-center bg-white border-y border-gray-300 px-6 py-3">
                <Text className="text-lg font-semibold text-gray-600">
                  Room1
                </Text>

                <TouchableOpacity
                  activeOpacity={0.6}
                  className='items-center justify-center size-10 border border-black/10 rounded-lg'
                >
                  <Iconify
                    icon='hugeicons:arrow-right-01'
                    size={24}
                    color='black'
                  />
                </TouchableOpacity>
              </View>
            )}
            renderItem={({ item }: { item: any }) => {
              // Check if this is the time marker
              if (item?.isTimeMarker) {
                return (
                  <CurrentTimeIndicator 
                    currentMinutes={item.currentMinutes}
                    previousItemMinutes={item.previousItemMinutes}
                    nextItemMinutes={item.nextItemMinutes}
                  />
                );
              }
              
              // Otherwise render the regular agenda item
              return (
                <AgendaItem 
                  item={item as AgendaItemType} 
                  onPress={() => handleEventPress(item as AgendaItemType)} 
                />
              );
            }}
          />
        </CalendarProvider>
      </View>
      
      <AgendaDetailsModal ref={bottomSheetModalRef} agendaItem={selectedAgendaItem} />
    </>
  );
}

const CalendarArrow: FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
  return (
    <View className="flex-row items-center justify-center size-10 bg-black/5 rounded">
      <Iconify
        icon={direction === 'left' ? 'hugeicons:arrow-left-01' : 'hugeicons:arrow-right-01'}
        size={24}
        color="black"
      />
    </View>
  );
};