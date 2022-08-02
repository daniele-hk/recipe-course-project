import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, pipe, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService,
                private shoppingListService: ShoppingListService) {

    }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-project-database-b372f-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        }
        );
        // Run, bur overwrite the previous one
        // const ingredients = this.shoppingListService.getIngredients();
        // this.http.put('https://recipe-project-database-b372f-default-rtdb.firebaseio.com/ingredients.json', ingredients)
        // .subscribe(response => {
        //     console.log(response);
        // }
        // );
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://recipe-project-database-b372f-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(
                 map(recipes => {
                return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
      }
    }