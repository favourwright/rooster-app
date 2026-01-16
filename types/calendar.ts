import { DateData } from 'react-native-calendars';

export interface AgendaItem {
  hour: string;
  title: string;
  duration?: string;
  color?: string;
  team?: {
    name: string;
    isAvailable: boolean;
  }[];
}

export interface AgendaSection {
  title: string;
  data: AgendaItem[];
}

export type DayState = 'disabled' | 'today' | 'selected' | 'inactive' | '';

export interface CalendarDayProps {
  date?: DateData;
  state?: DayState;
  marking?: any;
  onPress?: (date: DateData) => void;
}

export interface CalendarTheme {
  backgroundColor: string;
  calendarBackground: string;
  textSectionTitleColor: string;
  selectedDayBackgroundColor: string;
  selectedDayTextColor: string;
  todayTextColor: string;
  dayTextColor: string;
  textDisabledColor: string;
  dotColor: string;
  selectedDotColor: string;
  arrowColor: string;
  monthTextColor: string;
  indicatorColor: string;
}