import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Pages to be used in Production
import { LeaderboardsComponent } from './leaderboards.component';
import { AddDataComponent } from './add-data.component';
import { AccountEditComponent } from './account-edit.component';

// Components Routing
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LeaderboardsComponent,
    AccountEditComponent,
    AddDataComponent
  ]
})
export class ComponentsModule { }
