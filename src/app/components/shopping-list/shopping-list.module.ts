import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        ShoppingListComponent,    
        ShoppingEditComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RouterModule.forChild([
            { path:'', component: ShoppingListComponent }
        ]),
        SharedModule
    ]
})
export class ShoppingListModule {}