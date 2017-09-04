import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule {}
