import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromGeneralStore from '../../../app/components/store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store<fromGeneralStore.AppState> ){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        return this.store.select('auth').pipe(
            take(1),
            map( authState => {
                return authState.user
            }),
            map(user => {
                const isAuth = !!user; //!user ? false : true;
                if(isAuth) {
                    return isAuth;
                }
                return this.router.createUrlTree(['/auth']);
            }
        ));
    }
}