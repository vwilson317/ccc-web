import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { BarracaCard } from '../components/BarracaCard';
import { getBarracas } from '../services/barracaService';
import { Barraca } from '../types/barraca';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const BarracaListScreen: React.FC<Props> = ({ navigation }) => {
  const [barracas, setBarracas] = useState<Barraca[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBarracas();
  }, []);

  const loadBarracas = async () => {
    try {
      const data = await getBarracas({ searchQuery });
      setBarracas(data);
    } catch (error) {
      console.error('Error loading Barracas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    loadBarracas();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 pt-2">
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={barracas}
        renderItem={({ item }) => (
          <BarracaCard
            barraca={item}
            onPress={() => navigation.navigate('BarracaDetail', { barracaId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
