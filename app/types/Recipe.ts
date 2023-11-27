import type {Ingredient} from './Ingredient';

export interface Recipe {
  ingredients_have: Ingredient[];
  ingredients_missing: Ingredient[];
  title: string;
  instructions: string;
  percent_match: number;
  time: number;
  course: string;
  servings: number;
}
