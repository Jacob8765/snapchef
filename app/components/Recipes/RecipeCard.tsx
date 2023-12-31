import React from 'react';
import {Text, View} from 'react-native';
import {IngredientEmoji} from '../Ingredients/IngredientEmoji';
import type {Recipe} from '../../types/Recipe';

const Badge = ({text, gradient}: {text: string; gradient: boolean}) => {
  return (
    <View
      className={`rounded-lg border-solid border  p-1 m-1 ${
        gradient ? 'bg-violet-300 border-violet-300' : 'border-sky-500'
      }`}>
      <Text className="text-md">{text}</Text>
    </View>
  );
};

export const RecipeCard = ({
  percent_match,
  title,
  ingredients_have,
  ingredients_missing,
  instructions,
  time,
  servings,
  course,
}: Recipe) => {
  return (
    <View className="bg-gray-50 rounded-lg p-3 m-1">
      <Text className="text-3xl font-serif mb-3">{title}</Text>

      <View className="flex-row flex-wrap">
        <Badge text={`${percent_match.toFixed(2)}% Match`} gradient={true} />
        <Badge text={`${time} Minutes`} gradient={false} />
        <Badge text={`${servings} Servings`} gradient={false} />
        <Badge text={`${course}`} gradient={false} />
      </View>

      <Text className="text-xl my-3">Ingredients:</Text>
      <View className="flex-row flex-wrap my-1">
        {ingredients_have.map((ingredient, index) => (
          <View className="mr-2">
            <IngredientEmoji
              key={ingredient.name + ' ' + index}
              index={index}
              ingredient={ingredient}
            />
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {ingredients_missing.map((ingredient, index) => (
          <View className="mr-2 my-1">
            <IngredientEmoji
              index={index}
              key={ingredient.name + ' ' + index}
              ingredient={ingredient}
              disabled
            />
          </View>
        ))}
      </View>

      <Text className="text-xl my-3">Instructions:</Text>
      <Text className="text-md">{instructions}</Text>
    </View>
  );
};
