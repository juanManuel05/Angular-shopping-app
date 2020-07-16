import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { RecipeService } from '../components/recipes/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';
import { pipe } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService,
    ){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://shopping-app-2020.firebaseio.com/recipes.json',recipes)
        .subscribe((response)=> {
            console.log(response);
        })
    }

    FetchRecipes(){
          return this.http.get<Recipe[]>(
            'https://shopping-app-2020.firebaseio.com/recipes.json'
          )
        .pipe(
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
      )        
    }
}