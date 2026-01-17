import { View } from 'react-native';

interface CurrentTimeIndicatorProps {
  currentMinutes?: number;
  previousItemMinutes?: number;
  nextItemMinutes?: number;
}

export const CurrentTimeIndicator = ({ 
  currentMinutes, 
  previousItemMinutes, 
  nextItemMinutes 
}: CurrentTimeIndicatorProps = {}) => {
  // Calculate vertical offset for proportional positioning between items
  let verticalOffset = 0;
  if (currentMinutes && previousItemMinutes && nextItemMinutes) {
    const totalDuration = nextItemMinutes - previousItemMinutes;
    const elapsed = currentMinutes - previousItemMinutes;
    const progress = elapsed / totalDuration;
    
    // Assuming each agenda item is roughly 95px tall
    verticalOffset = -95 + (progress * 95);
  }

  return (
    <View 
      className='absolute flex-row items-center h-0.5 px-6 left-0 right-0 top-0'
      style={{ transform: [{ translateY: verticalOffset }] }}
    >
      {/* dot */}
      <View 
        className='size-3 rounded-full bg-[#7C3AED] -ml-1.5'
      />
      
      {/* Line */}
      <View className='flex-1 h-0.5 bg-[#7C3AED]' />
    </View>
  );
};