
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Carbonara', 
    //     'My Favourite Food', 
    //     'https://d15j9y5wlusr11.cloudfront.net/filer_public_thumbnails/filer_public/18/67/186766a4-e7c4-4fcb-9e4b-ef9e1e458793/recipe.jpg__600x600_q85_ALIAS-large_crop-smart_subsampling-2.jpg', 
    //     [
    //         new Ingredient('Spaghetti', 50),
    //         new Ingredient('Gunaciale', 200),
    //         new Ingredient('Eggs', 3),
    //         new Ingredient('Pecorino', 120),
    //         new Ingredient('Pepper', 5),
    //     ]),
    //     new Recipe('Big Fat Burger', 
    //     'Wow', 
    //     'https://fatphillsdiner.com/wp-content/uploads/2021/01/1.png',
    //     [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 3),
    //         new Ingredient('Chees', 5),
    //     ]),
    //   ];
    private recipes: Recipe[] = [];

      constructor(private shoppingListService: ShoppingListService)  {
      }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
        return this.recipes.slice();
      }

      getRepice(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}