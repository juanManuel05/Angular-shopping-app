import { FormControl } from '@angular/forms';

export class CustomValidators {
    static invalidTypeAmount(control:FormControl): {[s:string]: boolean} {
        if(typeof control.value !== 'number') {
            return {'invalidTypeAmount' : true};
        }
        return null;
    }
}