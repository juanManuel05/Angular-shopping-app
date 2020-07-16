import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  private componentDestroyed = new Subject();

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[])=> {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes(); 
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo:this.route});//relative path
    /**2nd parameter is to let anuglar know the current root, where we are at
     * In tthis case: URL/recipes(according to the app-routing.module)
     */
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  

}
