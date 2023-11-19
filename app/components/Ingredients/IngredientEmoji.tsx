import React from 'react';
import {Text, View} from 'react-native';

const TAILWIND_PASTEL_COLORS = [
  'bg-red-100',
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-purple-100',
  'bg-pink-100',
];

export const IngredientEmoji = ({
  name,
  disabled,
}: {
  name: string;
  disabled?: boolean;
}) => {
  return (
    <View
      className={`rounded-lg p-3 text-2xl ${
        disabled
          ? 'bg-gray-100'
          : TAILWIND_PASTEL_COLORS[
              Math.floor(Math.random() * 100) % TAILWIND_PASTEL_COLORS.length
            ]
      }`}>
      <Text className="text-xl">{name}</Text>
    </View>
  );
};
