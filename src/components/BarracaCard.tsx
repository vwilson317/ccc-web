import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Barraca } from '../types/restaurant';

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
      className="bg-white rounded-3xl shadow-sm mb-4 mx-2 overflow-hidden"
      onPress={onPress}
    >
      <Image
        source={{ uri: barraca.imageUrl }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold text-primary-900">{barraca.name}</Text>
          <View className="flex-row items-center bg-primary-100 px-2 py-1 rounded-lg">
            <Ionicons name="star" size={16} color="#f97316" />
            <Text className="ml-1 text-primary-900 font-medium">
              {barraca.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        
        <Text className="text-primary-500 mb-2">{barraca.cuisine}</Text>
        <Text className="text-primary-400 text-sm mb-3" numberOfLines={2}>
          {barraca.description}
        </Text>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color="#94a3b8" />
            <Text className="text-primary-400 ml-1">{barraca.address}</Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${
            barraca.isOpen 
              ? 'bg-green-100' 
              : 'bg-red-100'
          }`}>
            <Text className={`font-medium ${
              barraca.isOpen 
                ? 'text-green-700' 
                : 'text-red-700'
            }`}>
              {barraca.isOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
