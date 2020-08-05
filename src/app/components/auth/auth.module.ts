import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        RouterModule.forChild([
            { path:'', component: AuthComponent }
        ]),
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AuthModule {}