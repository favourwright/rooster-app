import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { ComponentProps, useMemo } from 'react';
import { Iconify } from 'react-native-iconify';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Define icon functions outside component for stable references
const homeIcon = ({ color }: { color: string }) => (
  <Iconify icon="solar:home-angle-outline" size={24} color={color} />
);
const roosterIcon = ({ color }: { color: string }) => (
  <Iconify icon="hugeicons:calendar-02" size={24} color={color} />
);
const publicationsIcon = ({ color }: { color: string }) => (
  <Iconify icon="hugeicons:brochure" size={24} color={color} />
);
const profileIcon = ({ color }: { color: string }) => (
  <Iconify icon="hugeicons:user-03" size={24} color={color} />
);

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: homeIcon,
        }}
      />
      <Tabs.Screen
        name="rooster"
        options={{
          title: 'Rooster',
          tabBarIcon: roosterIcon,
        }}
      />
      <Tabs.Screen
        name="publications"
        options={{
          title: 'Publications',
          tabBarIcon: publicationsIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: profileIcon,
        }}
      />
    </Tabs>
  );
}
