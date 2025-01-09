import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search restaurants...'
}) => {
  return (
    <View className="mb-4">
      <View className="flex-row items-center bg-white/90 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-lg">
        <Ionicons name="search" size={20} color="#94a3b8" />
        <TextInput
          className="flex-1 ml-3 text-primary-900"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
        />
        {value.length > 0 && (
          <TouchableOpacity 
            onPress={() => onChangeText('')}
            className="p-1"
          >
            <Ionicons name="close-circle" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
