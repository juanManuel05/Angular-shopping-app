import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './components/recipes/recipes-resolver.service';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';

const appRoutes: Routes = [
    { path:'', redirectTo:'/recipes',pathMatch:'full'},
    { path:'recipes', 
      component: RecipesComponent, 
      children: 
        [
            { path:'', component:RecipeStartComponent},
            { path:'new', component: RecipeEditComponent },
            { path:':id', component:RecipeDetailComponent, resolve: [RecipesResolverService]},
            { path:':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
        ],
        canActivate: [AuthGuard]
    },
    { path:'shopping-list', component: ShoppingListComponent },
    { path:'auth', component: AuthComponent }
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}