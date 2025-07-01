import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'app/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from 'app/login/login.component';

const routes: Routes = [
    
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
