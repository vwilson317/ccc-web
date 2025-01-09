import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getRestaurantById, getMenuItems } from '../services/restaurantService';
import { Restaurant, MenuItem as MenuItemType } from '../types/restaurant';
import { MenuItem } from '../components/MenuItem';

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { restaurantId: string } }, 'params'>;
};

export const RestaurantDetailScreen: React.FC<Props> = ({ route }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurantData();
  }, []);

  const loadRestaurantData = async () => {
    try {
      const restaurantData = await getRestaurantById(route.params.restaurantId);
      if (restaurantData) {
        setRestaurant(restaurantData);
        const menu = await getMenuItems(restaurantData.id);
        setMenuItems(menu);
      }
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPdfMenu = async () => {
    if (restaurant?.menuUrl) {
      try {
        await Linking.openURL(restaurant.menuUrl);
      } catch (error) {
        console.error('Error opening PDF menu:', error);
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  const menuByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItemType[]>);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Image
        source={{ uri: restaurant.imageUrl }}
        className="w-full h-64"
        resizeMode="cover"
      />
      
      <View className="p-4 bg-white shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">{restaurant.name}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text className="ml-1 text-lg">{restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <Text className="text-gray-600 mt-2">{restaurant.description}</Text>
        
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-gray-500">{restaurant.cuisine}</Text>
          <Text className="text-gray-500">{restaurant.priceRange}</Text>
        </View>
        
        <Text className="text-gray-600 mt-2">{restaurant.address}</Text>
        
        <Text className={`mt-2 ${restaurant.isOpen ? 'text-green-500' : 'text-red-500'} font-semibold`}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </Text>
      </View>

      {restaurant.menuUrl && (
        <TouchableOpacity
          className="mx-4 mt-4 p-4 bg-blue-500 rounded-lg"
          onPress={openPdfMenu}
        >
          <Text className="text-white text-center font-semibold">View PDF Menu</Text>
        </TouchableOpacity>
      )}

      <View className="mt-4 px-4">
        <Text className="text-xl font-bold mb-4">Menu</Text>
        {Object.entries(menuByCategory).map(([category, items]) => (
          <View key={category} className="mb-6">
            <Text className="text-lg font-semibold mb-2">{category}</Text>
            {items.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
