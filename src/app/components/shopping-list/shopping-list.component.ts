import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store'; 
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from  './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  private componentDestroyed = new Subject();
  
  constructor(
    private store: Store<fromShoppingList.AppState>
    ) { }
  
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');//Rn there is just one property(shoppingList) in the store. But there could be more, su by doing this im telling angular what part im interestet in
  }

  onEditItem(index:number) {
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }
  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
