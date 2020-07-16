import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy  {

  private componentDestroyed = new Subject();
  isAuthenticated = false;
  constructor(private storageServiceHttp: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
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
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
