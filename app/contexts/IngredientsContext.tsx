import {createContext, useState, type PropsWithChildren} from 'react';
import type {Ingredient} from '../types/Ingredient';

interface IngredientsContextProps {
  ingredients: Ingredient[] | null;
  setIngredients: (ingredients: Ingredient[]) => void;
}

export const IngredientsContext = createContext<IngredientsContextProps>({
  ingredients: null,
  setIngredients: () => {},
});

export const IngredientsContextProvider = (props: PropsWithChildren) => {
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

  return (
    <IngredientsContext.Provider value={{ingredients, setIngredients}}>
      {props.children}
    </IngredientsContext.Provider>
  );
};
