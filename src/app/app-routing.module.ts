import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'contact-list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/contact-list/contact-list.module').then(m => m.ContactListModule)
  },
  {
    path: 'contact-form',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/contact-form/contact-form.module').then(m => m.ContactFormModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
