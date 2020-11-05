import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromGeneralStore from '../../../app/components/store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy  {

  private componentDestroyed = new Subject();
  isAuthenticated = false;
  constructor(private storageServiceHttp: DataStorageService, private authService: AuthService,private store: Store<fromGeneralStore.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth')
    .pipe(
      map((authState) => authState.user)
    )
    .subscribe(user => {
      this.isAuthenticated = !user ? false : true; //!!user
    });
  }
  onSaveData(){
    this.storageServiceHttp.storeRecipes();
  }

  onFetchData(){
    this.storageServiceHttp.FetchRecipes().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
