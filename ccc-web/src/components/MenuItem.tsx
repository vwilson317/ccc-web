import React from 'react';
import { View, Text, Image } from 'react-native';
import { MenuItem as MenuItemType } from '../types/barraca';

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <View className="flex-row p-4 bg-white mb-2 rounded-lg">
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          className="w-20 h-20 rounded-lg mr-4"
          resizeMode="cover"
        />
      )}
      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-semibold flex-1">{item.name}</Text>
          <Text className="text-lg font-semibold ml-2">€{item.price.toFixed(2)}</Text>
        </View>
        <Text className="text-gray-600 mt-1">{item.description}</Text>
        {!item.available && (
          <Text className="text-red-500 mt-1">Currently unavailable</Text>
        )}
      </View>
    </View>
  );
};
