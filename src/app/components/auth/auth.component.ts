import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as fromGeneralStore from '../../../app/components/store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error :string = null;
  authForm: FormGroup;
  showPassword: boolean = false;
  
  constructor(private authService: AuthService, private router: Router, private store: Store<fromGeneralStore.AppState>) { }

  ngOnInit() {
    this.initForm();
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  private initForm(){

    let email = '';
    let password = '';
    this.authForm = new FormGroup({
      'email' : new FormControl(email,[Validators.required,Validators.email]),
      'password' : new FormControl(password,[Validators.required,Validators.minLength(6)])
    });
  }

  onSubmit() {
    
    if(!this.authForm.valid){
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if(this.isLoginMode){
      //authObs = this.authService.login(email,password);
      this.store.dispatch(new AuthActions.LoginStart({
        email,
        password
      })
    );
    }else{
        authObs = this.authService.signUp(email,password);       
    }    

    // authObs.subscribe((response) => {
    //   console.log(response);
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // },(errorResponse) => {
    //     console.log(errorResponse);
    //     this.error = `An error ocurred: ${errorResponse.error.error.message}`;
    //     this.isLoading = false;
    // });

    this.authForm.reset();
    this.error = null;
  }

  onHandleError() {
    this.error = null;
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
