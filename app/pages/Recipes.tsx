import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IngredientsContext} from '../contexts/IngredientsContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RecipeCard} from '../components/Recipes/RecipeCard';

const DUMMY_RECIPES = [
  {
    name: 'Mediterranean Pasta Salad',
    percentMatch: 92,
    ingredientsHave: [
      {name: 'Pasta', emoji: '🍝'},
      {name: 'Tomato Sauce', emoji: '🍅'},
      {name: 'Garlic', emoji: '🧄'},
      {name: 'Cheese', emoji: '🧀'},
      {name: 'Salt', emoji: '🧂'},
      {name: 'Sepper', emoji: '🧂'},
    ],
    ingredientsMissing: [
      {name: 'Olives', emoji: '🫒'},
      {name: 'Bell Pepper', emoji: '🫑'},
    ],
    instructions:
      'Cook pasta according to package instructions. In a large bowl, mix cooked pasta, sliced bell peppers, chopped olives, and tomato sauce. Drizzle with olive oil and season with salt and pepper to taste. Toss everything together until well combined. Chill in the refrigerator for at least 30 minutes before serving.',
    time: 30,
    servings: 4,
    course: 'Lunch',
  },
  {
    name: 'Honey Glazed Chicken',
    percentMatch: 69,
    ingredientsHave: [
      {name: 'Chicken Broth', emoji: '🍗'},
      {name: 'Pepper', emoji: '🧂'},
      {name: 'Olive Oil', emoji: '🫒'},
      {name: 'Bell Pepper', emoji: '🫑'},
      {name: 'Sweet Potato', emoji: '🍠'},
    ],
    ingredientsMissing: [
      {name: 'Honey', emoji: '🍯'},
      {name: 'Garlic', emoji: '🧄'},
      {name: 'Salt', emoji: '🧂'},
    ],
    instructions:
      'Preheat oven to 400°F (200°C). Season chicken with salt and pepper, then roast in the oven until golden brown. In a separate pan, toss sweet potatoes, bell peppers, and onions with olive oil, salt, and pepper. Roast vegetables until tender. In a saucepan, combine chicken broth and honey. Simmer until it thickens. Brush the honey glaze over the roasted chicken. Serve the chicken over the roasted vegetables.',
    time: 45,
    servings: 3,
    course: 'Dinner',
  },
];

export const Recipes = () => {
  const {ingredients} = React.useContext(IngredientsContext);
  return (
    <ScrollView>
      <Text className="text-3xl font-serif m-3">Recipes:</Text>

      <View className="flex-row flex-wrap">
        {DUMMY_RECIPES.map(recipe => (
          <View className="m-1">
            <RecipeCard key={recipe.name} {...recipe} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
