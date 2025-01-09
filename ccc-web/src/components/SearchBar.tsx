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
  placeholder = 'Search barracas...'
}) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mx-4 my-2">
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        className="flex-1 ml-2"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={20} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};
