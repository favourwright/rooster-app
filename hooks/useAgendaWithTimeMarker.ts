import { useMemo, useState, useEffect } from 'react';

interface AgendaSection {
  title: string;
  data: any[];
}

// Helper function to convert time string to minutes
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const useAgendaWithTimeMarker = (
  sections: AgendaSection[],
  selectedDate: string,
  isToday: boolean
) => {
  // Force re-render every minute to update marker position
  const [, setTick] = useState(0);
  
  useEffect(() => {
    if (!isToday) return;
    
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [isToday]);

  return useMemo(() => {
    if (!isToday || !sections || sections.length === 0) return sections;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Process sections and only add marker to the selected date's section
    return sections.map(section => {
      // Only add marker to the section matching the selected date
      if (section.title !== selectedDate) {
        return section;
      }

      const itemsWithMarker = [...section.data];
      let markerInserted = false;

      // Find where to insert the marker based on time
      // We need to check if current time falls between any two consecutive items
      for (let i = 0; i < itemsWithMarker.length; i++) {
        const currentItem = itemsWithMarker[i];
        
        if (currentItem.hour) {
          const currentItemMinutes = timeToMinutes(currentItem.hour);
          
          // Check if we're currently in this time slot or before it
          if (currentMinutes < currentItemMinutes) {
            // Current time is before this item - insert marker here
            itemsWithMarker.splice(i, 0, { 
              isTimeMarker: true,
              currentMinutes: currentMinutes, // Pass current time for proportional positioning
            });
            markerInserted = true;
            break;
          }
          
          // Check if we're between this item and the next item
          if (i < itemsWithMarker.length - 1) {
            const nextItem = itemsWithMarker[i + 1];
            if (nextItem.hour) {
              const nextItemMinutes = timeToMinutes(nextItem.hour);
              
              // If current time is between current and next item
              if (currentMinutes >= currentItemMinutes && currentMinutes < nextItemMinutes) {
                // Insert marker after current item
                itemsWithMarker.splice(i + 1, 0, { 
                  isTimeMarker: true,
                  currentMinutes: currentMinutes,
                  previousItemMinutes: currentItemMinutes,
                  nextItemMinutes: nextItemMinutes,
                });
                markerInserted = true;
                break;
              }
            }
          }
        }
      }

      // If marker wasn't inserted yet, it means current time is after all items
      // Add marker at the end only if it's still within working hours
      if (!markerInserted && itemsWithMarker.length > 0) {
        const lastItem = itemsWithMarker[itemsWithMarker.length - 1];
        
        if (lastItem?.hour) {
          const lastItemStartMinutes = timeToMinutes(lastItem.hour);
          
          // Add marker at end if current time is after the last item
          // and before end of working day (20:00 / 8 PM)
          if (currentMinutes >= lastItemStartMinutes && currentMinutes < 20 * 60) {
            itemsWithMarker.push({ 
              isTimeMarker: true,
              currentMinutes: currentMinutes,
            });
            markerInserted = true;
          }
        }
      }

      return {
        ...section,
        data: itemsWithMarker,
      };
    });
  }, [sections, selectedDate, isToday, Math.floor(new Date().getTime() / 60000)]);
};