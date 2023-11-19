import React from 'react';
import {Text, View} from 'react-native';
import {IngredientEmoji} from '../Ingredients/IngredientEmoji';
import {Ingredient} from '../../types/Ingredient';

interface RecipeCardProps {
  percentMatch: number;
  name: string;
  ingredientsHave: Ingredient[];
  ingredientsMissing: Ingredient[];
  instructions: string;
  time: number;
  servings: number;
  course: string;
}

const Badge = ({text, gradient}: {text: string; gradient: boolean}) => {
  return (
    <View
      className={`rounded-lg border-1 p-1 m-1 ${
        gradient && 'bg-gradient-to-r from-violet-600 to-indigo-600'
      }`}>
      <Text className="text-lg">{text}</Text>
    </View>
  );
};

export const RecipeCard = ({
  percentMatch,
  name,
  ingredientsHave,
  ingredientsMissing,
  instructions,
  time,
  servings,
  course,
}: RecipeCardProps) => {
  return (
    <View className="bg-gray-50 rounded-lg p-3 m-1">
      <Text className="text-3xl font-serif mb-3">{name}</Text>

      <View className="flex-row flex-wrap">
        <Badge text={`${percentMatch}% Match`} gradient={true} />
        <Badge text={`${time} Minutes`} gradient={false} />
        <Badge text={`${servings} Servings`} gradient={false} />
        <Badge text={`${course}`} gradient={false} />
      </View>

      <Text className="text-xl mb-3">Ingredients:</Text>
      <View className="flex-row flex-wrap">
        {ingredientsHave.map(ingredient => (
          <IngredientEmoji key={ingredient.name} name={ingredient.emoji} />
        ))}
        {ingredientsMissing.map(ingredient => (
          <IngredientEmoji
            key={ingredient.name}
            name={ingredient.emoji}
            disabled
          />
        ))}
      </View>

      <Text className="text-xl mb-3">Instructions:</Text>
      <Text className="text-lg">{instructions}</Text>
    </View>
  );
};
