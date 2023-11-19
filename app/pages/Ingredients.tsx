import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {IngredientsContext} from '../contexts/IngredientsContext';
import {Ingredient} from '../types/Ingredient';
import {SwipeListView} from 'react-native-swipe-list-view';

const TAILWIND_PASTEL_COLORS = [
  'bg-red-100',
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-purple-100',
  'bg-pink-100',
];

const IngredientItem = ({item, index}: {item: Ingredient; index: number}) => {
  return (
    <View className=" bg-gray-50 d-flex flex-row justify-start rounded-lg p-2 items-center m-1">
      <View
        className={`rounded-lg p-3 text-2xl ${
          TAILWIND_PASTEL_COLORS[index % TAILWIND_PASTEL_COLORS.length]
        }`}>
        <Text className="text-xl">{item.emoji}</Text>
      </View>
      <View className="ml-4">
        <Text className="text-xl">{item.name}</Text>
      </View>
    </View>
  );
};

const renderDeleteButton = ({handleDelete}: {handleDelete: () => void}) => {
  return (
    <TouchableOpacity onPressOut={handleDelete}>
      <View className="d-flex flex-row justify-end m-1">
        <View className="rounded-lg bg-red-500 p-5">
          <Text className="text-xl">🗑️</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Ingredients = ({navigation}: {navigation: any}) => {
  const {ingredients, setIngredients} = React.useContext(IngredientsContext);

  useEffect(() => {
    setIngredients([
      {name: 'Flour', emoji: '🌾'},
      {name: 'Sugar', emoji: '🍬'},
      {name: 'Eggs', emoji: '🥚'},
    ]);
  }, []);

  const deleteIngredient = (index: number) => {
    if (!ingredients) {
      return;
    }
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View className="p-3 flex-1">
        <SwipeListView
          ListHeaderComponent={
            <Text className="text-3xl font-serif mb-3">
              My Ingredients{ingredients?.length && ` (${ingredients.length})`}:
            </Text>
          }
          data={ingredients}
          renderItem={({item, index}) => (
            <IngredientItem key={item.name} item={item} index={index} />
          )}
          renderHiddenItem={(item, index) =>
            renderDeleteButton({
              handleDelete: () => deleteIngredient(index as unknown as number),
            })
          }
          rightOpenValue={-75}
        />

        {/* Button for searching for recipes. Should be much bigger than the other */}
        {/* buttons. */}
        <View className="d-flex flex-col p-1">
          <TouchableOpacity
            className="rounded-lg bg-indigo-400 p-4 grow mb-2"
            onPress={() => navigation.navigate('Recipes')}>
            <Text className="text-3xl text-white font-serif text-center">
              🔍 search for recipes
            </Text>
          </TouchableOpacity>

          {/* Buttons for adding an ingredient from the camera / manually */}
          <View className="d-flex flex-row justify-center">
            <TouchableOpacity
              className="rounded-lg bg-green-400 p-3 grow mr-2"
              onPress={() => navigation.navigate('Camera')}>
              <Text className="text-xl text-white font-serif">
                📷 Take a picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-lg bg-blue-400 p-5">
              <Text>📝</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
