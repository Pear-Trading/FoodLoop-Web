import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardsComponent } from './leaderboards.component';
import { AccountEditComponent } from './account-edit.component';
import { AddDataComponent } from './add-data.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Components'
    },
    children: [
      {
        path: 'leaderboards',
        component: LeaderboardsComponent,
        data: {
          title: 'Leaderboards'
        }
      },
      {
        path: 'account-edit',
        component: AccountEditComponent,
        data: {
          title: 'Edit Account'
        }
      },
      {
        path: 'add-data',
        component: AddDataComponent,
        data: {
          title: 'Add Data'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
