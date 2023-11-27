import {IngredientsContext} from '../contexts/IngredientsContext';
import {useContext, useEffect, useState} from 'react';
import type {Recipe} from '../types/Recipe';

export function useIngredients() {
  const {ingredients} = useContext(IngredientsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const queryFn = async () => {
    setIsLoading(true);
    const payload = ingredients.map(i => i.name);
    console.log('PAYLOAD', payload);

    try {
      const res = await fetch('http://127.0.0.1:5000/find_recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingredients_list: payload}),
      });

      console.log('RES', res);
      const data = (await res.json()) as Recipe[];
      setIsLoading(false);
      setRecipes(data);
      console.log('DATA', data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    queryFn();
  }, [ingredients]);

  return {recipes, isLoading};
}
