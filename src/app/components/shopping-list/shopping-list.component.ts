import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[];
  private componentDestroyed = new Subject();
  
  constructor(
    private shoppingListService: ShoppingListService
    ) { }
  
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      });
  }

  onEditItem(index:number) {
    this.shoppingListService.startedEditing.next(index);
  }
  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
