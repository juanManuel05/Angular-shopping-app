import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListAction from  './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Bananas',6)
    ],
    editedIngredient: null,
    editedIngredientIndex:-1
};

export function ShoppingListReducer(state: State = initialState, action: ShoppingListAction.ShoppingListActionsAvailable){
    
    switch(action.type) {
        
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state, //we copy the old state, so the original state remains inmutable
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients,...action.payload]
                //If i had done '[...state.ingredients,action.payload]' i would of have added an 
                //array to an array and hence we have a nested array, which is not what im after.
                //Instead, by doing '...action.payload' im pulling the elem out of the payload and add them into the 'ingredients array'
            }
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];//ingredient to update
            const updatedIngredient = {
                ...ingredient, //copy the old ingredient
                ...action.payload//copy the ingredient from action, on the line above i basically copy the old ingredient to be overwritten then
                
                //I could just do the second copying but for example in cases where you have en ID on that existing ingredient which you dont want to 
                //overwrite, it'd make sense to copy all the old data so that you keep things like en ID or anything


            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing,ingIndex) => { //In this case there is no '...' at the begining cause if si, i'd be getting a copy of the array. Without the dots
                    return ingIndex !== state.editedIngredientIndex;                   //im replacing the prpoperty 'ingredients' inside '...state' (after applying the filter)
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
                // since that objects are passed on by reference, 'state.ingredients[action.payload]' would give a reference to the original array(on the store), 
                //which is not recommended. Instead a create a new object array with a copy of the original
            }
        case ShoppingListAction.STOP_EDIT:
            return{
                ...state,
                editedIngredientIndex:-1,
                editedIngredient:null
            }
        default:
            return state;
    }
}