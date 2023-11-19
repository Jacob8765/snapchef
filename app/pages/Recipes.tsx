import React from 'react';
import {View, Text} from 'react-native';
import {IngredientsContext} from '../contexts/IngredientsContext';

export const Recipes = () => {
  const {ingredients} = React.useContext(IngredientsContext);
  return (
    <View className="p-3 rounded-lg bg-indigo-100">
      <Text className="text-2xl">Recipes</Text>
      <Text>{JSON.stringify(ingredients)}</Text>
    </View>
  );
};
