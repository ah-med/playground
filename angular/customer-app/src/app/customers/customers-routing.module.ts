import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then((m) => m.AccountsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
