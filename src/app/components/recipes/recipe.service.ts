import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from  '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromGeneralStore from '../store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schnitzel',
    //         'a super yammy schnitzel',
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('Salad',1)
    //         ]),
    //     new Recipe('Big fut burger',
    //         'you need no more',
    //         'https://images.deliveryhero.io/image/pedidosya/profile-headers/modo-burger.jpg?quality=70&width=414',
    //         [
    //             new Ingredient('Beef',4),
    //             new Ingredient('chips',3)
    //         ]
    //     )
    // ];


    constructor(private store: Store<fromGeneralStore.AppState>){}

    getRecipes (): Recipe[]{
        return this.recipes.slice();
        //return like this so return an exact copy of the array, otherwise i'd be returning
        //the exact array 'Recipes' which is not what i want(java script--> reference variable)
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        //this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    delteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}