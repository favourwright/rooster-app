import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="flex-row bg-white border-t border-gray-100 px-8 overflow-hidden"
      style={{
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get the icon from options
        const iconComponent = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? '#5653FC' : '#9CA3AF',
              size: 24,
            })
          : null;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-2 pt-4 relative"
            activeOpacity={0.7}
          >
            <View className="items-center gap-1">
              {iconComponent}
              <Text
                className={`text-sm font-semibold ${
                  isFocused ? 'text-[#5653FC]' : 'text-gray-400'
                }`}
              >
                {typeof label === 'string' ? label : route.name}
              </Text>
            </View>
            {isFocused && <Animated.View
              entering={FadeInUp.springify()}
              className='absolute inset-x-2 h-1.5 bg-[#5653FC] -top-0.5 rounded'
            />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};