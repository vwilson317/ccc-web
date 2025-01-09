import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Barraca } from '../types/barraca';

interface BarracaCardProps {
  barraca: Barraca;
  onPress: () => void;
}

export const BarracaCard: React.FC<BarracaCardProps> = ({
  barraca,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-lg shadow-md mx-4 mb-4"
      onPress={onPress}
    >
      <Image
        source={{ uri: barraca.imageUrl }}
        className="w-full h-48 rounded-t-lg"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">{barraca.name}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="ml-1">{barraca.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text className="text-gray-600 mt-1">{barraca.cuisine}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-gray-500">{barraca.priceRange}</Text>
          <Text className={`${barraca.isOpen ? 'text-green-500' : 'text-red-500'}`}>
            {barraca.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
