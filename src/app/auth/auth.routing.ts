import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule {}
