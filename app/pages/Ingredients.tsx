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
import {IngredientItem} from '../components/Ingredients/IngredientItem';

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

  const deleteIngredient = (index: number) => {
    console.log('deleteIngredient', index);
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
              My Ingredients
              {ingredients?.length > 0 && ` (${ingredients.length})`}:
            </Text>
          }
          data={ingredients}
          renderItem={({item, index}) => (
            <IngredientItem key={item.name} item={item} index={index} />
          )}
          renderHiddenItem={(item, index) =>
            renderDeleteButton({
              handleDelete: () => deleteIngredient(item.index),
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
