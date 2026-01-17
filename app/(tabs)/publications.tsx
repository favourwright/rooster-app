import React, { useState } from 'react';
import { View, FlatList, ListRenderItem, Text } from 'react-native';
import { Header } from '@/components/publication/Header';
import { SearchBar } from '@/components/publication/SearchBar';
import { PublicationCard, Publication } from '@/components/publication/PublicationCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data
const mockPublications: Publication[] = [
  {
    id: 1,
    title: 'Vaccine hesitancy trends',
    description: 'How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400',
    tags: ['Covid', 'Vaccine'],
    author: {
      name: 'Elijah Oyindamola',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      date: '20 Jan 2022',
      readTime: '3mins'
    }
  },
  {
    id: 2,
    title: 'Vaccine hesitancy trends',
    description: 'How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400',
    tags: ['Covid', 'Vaccine'],
    author: {
      name: 'Elijah Oyindamola',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      date: '20 Jan 2022',
      readTime: '3mins'
    }
  }
];

const PublicationsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { top } = useSafeAreaInsets();

  const handlePublicationPress = (publication: Publication) => {
    console.log('Publication pressed:', publication.title);
    // Navigate to detail screen or handle press
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    // Navigate to profile screen
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // search functionality
  };

  const renderPublication: ListRenderItem<Publication> = ({ item }) => (
    <PublicationCard 
      publication={item}
      onPress={handlePublicationPress}
    />
  );

  return (
    <View className="flex-1 bg-white gap-6" style={{ paddingTop: top }}>
      <Header 
        userName="back"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
        onProfilePress={handleProfilePress}
      />
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />

      <FlatList
        data={mockPublications}
        renderItem={renderPublication}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text className="text-xl font-bold">Latest publications</Text>}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='px-6 gap-6'
        ListFooterComponent={<View className='h-6' />}
      />
    </View>
  );
};

export default PublicationsScreen;