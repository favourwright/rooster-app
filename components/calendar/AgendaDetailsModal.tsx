import { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { AgendaItem } from '@/types/calendar';
import { Iconify } from 'react-native-iconify';

export type AgendaDetailsModalProps = {
  agendaItem?: AgendaItem;
}

// Mock team members - replace with actual data
const teamMembers = [
  { name: 'Omar r.', avatar: 'https://i.pravatar.cc/150?img=12', time: '4:00 - 8:00' },
  { name: 'Elijah a.', avatar: 'https://i.pravatar.cc/150?img=13', time: '8:00 - 12:00' },
];

// Mock notifications - replace with actual data
const notifications = [
  { 
    name: 'Omar r', 
    avatar: 'https://i.pravatar.cc/150?img=12',
    message: 'Medewerker is medisch toegewezen a...',
    time: '2 min geleden'
  },
  { 
    name: 'Omar r', 
    avatar: 'https://i.pravatar.cc/150?img=12',
    message: 'Medewerker is medisch toegewezen a...',
    time: '2 min geleden'
  },
];

export const AgendaDetailsModal = forwardRef<BottomSheetModal, AgendaDetailsModalProps>(
  ({ agendaItem }, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    
    const closeModal = useCallback(() => {
      if (ref && typeof ref !== 'function') {
        ref.current?.close();
      }
    }, [ref]);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        detached={true}
        bottomInset={10}
        style={{ marginHorizontal: 10 }}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: '#cccccc80',
          width: 80,
          height: 10,
          marginTop: 10,
        }}
      >
        <BottomSheetScrollView>
          <View className='flex-1 px-6 flex-row justify-between items-center gap-2'>
            <TouchableOpacity
              activeOpacity={0.6}
              className='items-center justify-center size-10 border border-black/10 rounded-lg'
            >
              <Iconify
                icon='hugeicons:arrow-left-01'
                size={24}
                color='black'
              />
            </TouchableOpacity>
            <Text className="text-2xl font-bold">Shift Details</Text>
            <TouchableOpacity
              onPress={closeModal}
              activeOpacity={0.6}
              className='items-center justify-center size-10 border border-black/10 rounded-lg'
            >
              <Iconify
                icon='hugeicons:multiplication-sign'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          </View>

          {/* Header Section */}
          <View className="px-6 pt-4 pb-6 border-b border-gray-200">
            <View className="flex-row items-center gap-3 mb-4">
              <Iconify icon="hugeicons:time-quarter" size={20} color="#666" />
              <Text className="text-base text-gray-700">
                8:00am - 12:00pm
              </Text>
              <View className="w-px h-5 bg-gray-300" />
              <Iconify icon="hugeicons:calendar-02" size={20} color="#666" />
              <Text className="text-base text-gray-700">10 - 02 - 2024</Text>
            </View>
          </View>

          {/* Description Section */}
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-semibold mb-3">Beschrijving</Text>
            <Text className="text-base text-gray-600 leading-6">
              Dit is een kamer voor gesprekken tussen chirurgische artsen en patiënten over
            </Text>
          </View>

          {/* Service Section */}
          <View className="flex-row p-6 gap-4">
            <View className='flex-grow gap-2'>
              <Text className="text-lg font-semibold mb-4">Dienst</Text>
              <Text className="text-base font-medium text-orange-500 bg-orange-100 p-2 px-4 self-start rounded-full">
                Ochtend 8:00-12:00
              </Text>
            </View>
            <View className='w-px bg-gray-300' />
            <View className='flex-grow gap-5'>
              <View className="flex-row items-center gap-2 mb-4">
                <Iconify icon="hugeicons:building-03" size={18} color="#666" />
                <Text className="text-base text-gray-600">Kamers</Text>
              </View>
              <Text className="text-base font-medium text-gray-600">
                Verkoeverruimte
              </Text>
            </View>
          </View>

          {/* Team Section */}
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-semibold mb-4">Team</Text>
            <View className="gap-4">
              {teamMembers.map((member, index) => (
                <View 
                  key={index}
                  className={`flex-row items-center justify-between p-4 rounded-full ${
                    index === 1 ? 'bg-blue-50' : 'bg-orange-50'
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <View className="flex-row">
                      <Image 
                        source={{ uri: member.avatar }}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <Image 
                        source={{ uri: teamMembers[1].avatar }}
                        className="w-12 h-12 rounded-full border-2 border-white -ml-3"
                      />
                    </View>
                    <Text className="text-base font-medium">
                      {member.name}, Elijah a.
                    </Text>
                  </View>
                  <Text className={`text-base font-medium ${
                    index === 1 ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {member.time}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Notifications Section */}
          <View className="p-6 pb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Notities</Text>
              <View className="flex-row items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <Text className="text-sm font-medium text-gray-700">3 notities</Text>
                <Iconify icon="hugeicons:arrow-right-02" size={18} color="#666" />
              </View>
            </View>
            <View className="gap-3">
              {notifications.map((notification, index) => (
                <View 
                  key={index}
                  className="flex-row items-start gap-3 p-4 border border-gray-200 rounded-xl"
                >
                  <Image 
                    source={{ uri: notification.avatar }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-base font-semibold">{notification.name}</Text>
                      <Text className="text-sm text-gray-500">{notification.time}</Text>
                    </View>
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                      {notification.message}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

AgendaDetailsModal.displayName = 'AgendaDetailsModal';