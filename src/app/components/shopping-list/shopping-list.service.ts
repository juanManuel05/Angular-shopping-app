import { Injectable} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Bananas',6)
  ];
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) : Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number,newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
    
}