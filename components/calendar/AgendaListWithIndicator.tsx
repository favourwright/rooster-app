import { FC, JSX, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AgendaList } from 'react-native-calendars';
import { CurrentTimeIndicator } from './CurrentTimeIndicator';

interface AgendaListWithIndicatorProps {
  sections: any[];
  renderSectionHeader: () => JSX.Element;
  renderItem: (info: any) => JSX.Element;
  isToday: boolean;
  selectedDate: string;
}

// Helper function to convert time string to minutes
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Approximate height of each agenda item (adjust based on your actual item height)
const ITEM_HEIGHT = 95;
const SECTION_HEADER_HEIGHT = 60;

export const AgendaListWithIndicator: FC<AgendaListWithIndicatorProps> = ({
  sections,
  renderSectionHeader,
  renderItem,
  isToday,
  selectedDate,
}) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [indicatorTop, setIndicatorTop] = useState(0);

  // Calculate indicator position based on current time
  const calculateIndicatorPosition = () => {
    if (!isToday) {
      setShowIndicator(false);
      return;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Find the section for today
    const todaySection = sections.find(section => section.title === selectedDate);
    if (!todaySection || !todaySection.data || todaySection.data.length === 0) {
      setShowIndicator(false);
      return;
    }

    // Find the position between items
    let cumulativeHeight = SECTION_HEADER_HEIGHT;
    let found = false;

    for (let i = 0; i < todaySection.data.length; i++) {
      const item = todaySection.data[i];
      
      if (item.hour) {
        const itemStartMinutes = timeToMinutes(item.hour);
        
        if (currentMinutes < itemStartMinutes) {
          // Current time is before this item - place indicator here
          found = true;
          setIndicatorTop(cumulativeHeight);
          setShowIndicator(true);
          break;
        }
        
        // Add height for this item
        cumulativeHeight += ITEM_HEIGHT;
      }
    }

    // If not found, current time is after all items
    if (!found) {
      // Check if we should show indicator at the end
      const lastItem = todaySection.data[todaySection.data.length - 1];
      if (lastItem?.hour) {
        const lastItemMinutes = timeToMinutes(lastItem.hour);
        // Only show if current time is within reasonable working hours
        if (currentMinutes > lastItemMinutes && currentMinutes < 20 * 60) {
          setIndicatorTop(cumulativeHeight);
          setShowIndicator(true);
        } else {
          setShowIndicator(false);
        }
      }
    }
  };

  // Calculate on mount and when dependencies change
  useEffect(() => {
    calculateIndicatorPosition();
    
    // Update every minute
    const interval = setInterval(calculateIndicatorPosition, 60000);
    return () => clearInterval(interval);
  }, [isToday, sections, selectedDate]);

  return (
    <View style={{ flex: 1 }}>
      <AgendaList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
      
      {/* Floating time indicator */}
      {showIndicator && (
        <View
          className='absolute left-0 right-0'
          style={{ top: indicatorTop }}
          pointerEvents="none"
        >
          <CurrentTimeIndicator />
        </View>
      )}
    </View>
  );
};