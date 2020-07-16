import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
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
      authObs = this.authService.login(email,password);
    }else{
        authObs = this.authService.signUp(email,password);       
    }    

    authObs.subscribe((response) => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },(errorResponse) => {
        console.log(errorResponse);
        this.error = `An error ocurred: ${errorResponse.error.error.message}`;
        this.isLoading = false;
    });
    this.authForm.reset();
    this.error = null;
  }

  onHandleError() {
    this.error = null;
  }

}
