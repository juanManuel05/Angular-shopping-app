import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Subject, pipe, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
  })
  export class AuthService{
       
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer : any;

    constructor(private http:HttpClient, private router: Router) {}
    
    signUp(email:string,password:string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRnk_N3qsCm6oMGQDA_2ZUOMBI7xk5eJg',
            {
                email,
                password,
                returnSecureToken:true
            }
        )
        .pipe(tap(resdata => {
            this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)
        }));
        
    }

    autoLogin(){
        const userData : {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRnk_N3qsCm6oMGQDA_2ZUOMBI7xk5eJg',
            {
                email,
                password,
                returnSecureToken:true
            }
        )
        .pipe(tap(resdata => {
            this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)
        }));
    }

    autoLogOut(expirationDuration: number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        },expirationDuration);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(email:string, userId:string,token:string,expiresIn:number){
        
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email,userId,token,expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    
    }
  }
