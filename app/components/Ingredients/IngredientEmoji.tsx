import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Ingredient} from '../../types/Ingredient';

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
  ingredient,
  disabled,
  index,
}: {
  ingredient: Ingredient;
  disabled?: boolean;
  index: number;
}) => {
  const [isFullNameVisable, setIsFullNameVisable] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsFullNameVisable(!isFullNameVisable)}
      className={`rounded-lg p-3 text-2xl ${
        disabled
          ? 'bg-gray-100'
          : TAILWIND_PASTEL_COLORS[index % TAILWIND_PASTEL_COLORS.length]
      }`}>
      <Text className="text-xl">
        {isFullNameVisable ? ingredient.name : ingredient.emoji}
      </Text>
    </TouchableOpacity>
  );
};
