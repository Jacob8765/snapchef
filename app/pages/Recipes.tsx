import React from 'react';
import {View, Text} from 'react-native';
import {IngredientsContext} from '../contexts/IngredientsContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RecipeCard} from '../components/Recipes/RecipeCard';

const DUMMY_RECIPES = [
  {
    name: 'Pasta',
    percentMatch: 100,
    ingredientsHave: [
      {name: '🍝', emoji: '🍝'},
      {name: '🍅', emoji: '🍅'},
      {name: '🧄', emoji: '🧄'},
      {name: '🧀', emoji: '🧀'},
    ],
    ingredientsMissing: [
      {name: '🍄', emoji: '🍄'},
      {name: '🥩', emoji: '🥩'},
    ],
    instructions: 'lore ipsum dolor sit amet',
    time: 30,
    servings: 4,
    course: 'Dinner',
  },
  {
    name: 'Hamburger',
    percentMatch: 81,
    ingredientsHave: [
      {name: '🍔', emoji: '🍔'},
      {name: '🍅', emoji: '🍅'},
      {name: '🧄', emoji: '🧄'},
      {name: '🧀', emoji: '🧀'},
    ],
    ingredientsMissing: [
      {name: '🍄', emoji: '🍄'},
      {name: '🥩', emoji: '🥩'},
    ],
    instructions: 'Cook it',
    time: 30,
    servings: 4,
    course: 'Dinner',
  },
];

export const Recipes = () => {
  const {ingredients} = React.useContext(IngredientsContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text className="text-3xl font-serif mb-3">Recipes:</Text>

      <View className="flex-row flex-wrap">
        {DUMMY_RECIPES.map(recipe => (
          <RecipeCard key={recipe.name} {...recipe} />
        ))}
      </View>
    </SafeAreaView>
  );
};
