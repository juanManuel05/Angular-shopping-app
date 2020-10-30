import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/FormValidators/custom-validators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from  '../store/shopping-list.actions';
import * as fromGeneralStore from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static: false}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static: false}) amountInputRef : ElementRef;

  shoppingForm : FormGroup;
  private componentDestroyed = new Subject();
  //subscription: Subscription;
  editMode = false;
  editedItem : Ingredient;

  constructor(private store: Store<fromGeneralStore.AppState>) { }

  ngOnInit() {

    this.shoppingForm = new FormGroup({
      'name': new FormControl (
        null,
        [Validators.required]
      ),
      'amount':new FormControl (
        null,
        [Validators.required,Validators.pattern('^[1-9]+[0-9]*$') ,CustomValidators.invalidTypeAmount]
      )
    });

    //this.subscription = this.store.select('shoppingList').subscribe();

    this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingForm.setValue({
          'name' : this.editedItem.name,
          'amount' : this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    }

    );
  }

  onSubmit(){
    if(this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   new Ingredient(
      //     this.shoppingForm.value.name,
      //     this.shoppingForm.value.amount
      //   ) 
      // );
      this.store.dispatch( new ShoppingListAction.UpdateIngredient(        
           new Ingredient(
                this.shoppingForm.value.name, 
                this.shoppingForm.value.amount
          ) 
        )
      );
    } else {
    // this.shoppingListService.addIngredient(
    //   new Ingredient(
    //     this.shoppingForm.value.name,
    //     this.shoppingForm.value.amount
    //   )
    // );
      this.store.dispatch(new ShoppingListAction.AddIngredient(
        new Ingredient(
              this.shoppingForm.value.name,
              this.shoppingForm.value.amount
            ))
      )
    }

    this.editMode = false;
    this.shoppingForm.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();    
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
    this.store.dispatch(new ShoppingListAction.StopEdit());

    //this.subscription.unsubscribe();
  }
}
