import {createContext, useState, type PropsWithChildren} from 'react';
import type {Ingredient} from '../types/Ingredient';

interface IngredientsContextProps {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
}

export const IngredientsContext = createContext<IngredientsContextProps>({
  ingredients: [],
  setIngredients: () => {},
});

export const IngredientsContextProvider = (props: PropsWithChildren) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {name: 'Flour', emoji: '🌾'},
    {name: 'Sugar', emoji: '🍬'},
    {name: 'Eggs', emoji: '🥚'},
  ]);

  return (
    <IngredientsContext.Provider value={{ingredients, setIngredients}}>
      {props.children}
    </IngredientsContext.Provider>
  );
};
