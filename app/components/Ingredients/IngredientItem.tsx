import React from 'react';
import {Text, View} from 'react-native';
import {IngredientEmoji} from './IngredientEmoji';
import {Ingredient} from '../../types/Ingredient';

export const IngredientItem = ({item}: {item: Ingredient}) => {
  return (
    <View className=" bg-gray-50 d-flex flex-row justify-start rounded-lg p-2 items-center m-1">
      <IngredientEmoji name={item.emoji} />
      <View className="ml-4">
        <Text className="text-xl">{item.name}</Text>
      </View>
    </View>
  );
};
