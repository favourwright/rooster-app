import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { Iconify } from 'react-native-iconify';
import { TabBar } from '@/components/TabBar';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: ComponentProps<typeof Iconify>['icon'];
  color: string;
}) {
  return <Iconify icon={props.name} size={24} color={props.color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props)=><TabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: (props)=><TabBarIcon name="solar:home-angle-outline" {...props} />,
        }}
      />
      <Tabs.Screen
        name="rooster"
        options={{
          title: 'Rooster',
          tabBarIcon: (props)=><TabBarIcon name="hugeicons:calendar-02" {...props} />,
        }}
      />
      <Tabs.Screen
        name="publications"
        options={{
          title: 'Publications',
          tabBarIcon: (props)=><TabBarIcon name="hugeicons:brochure" {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (props)=><TabBarIcon name="hugeicons:user-03" {...props} />,
        }}
      />
    </Tabs>
  );
}
