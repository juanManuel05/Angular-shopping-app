import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/FormValidators/custom-validators';
import { Subject, Subscription } from 'rxjs';

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
  editedItemIndex: number;
  editedItem : Ingredient;

  constructor(private shoppingListService: ShoppingListService ) { }

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

    //this.subscription = this.shoppingListService.startedEditing.subscribe();

    this.shoppingListService.startedEditing.subscribe((index:number)=> {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        'name' : this.editedItem.name,
        'amount' : this.editedItem.amount
      })
    });
  }

  onSubmit(){
    if(this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        new Ingredient(
          this.shoppingForm.value.name,
          this.shoppingForm.value.amount
        ) 
      );
    } else {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.shoppingForm.value.name,
        this.shoppingForm.value.amount
      )
    );
    }

    this.editMode = false;
    this.shoppingForm.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();    
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();

    //this.subscription.unsubscribe();
  }
}
