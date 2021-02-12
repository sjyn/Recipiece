import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequireAuthGuard} from './guards/require-auth-guard.service';
import {LoggedInGuard} from './guards/logged-in-guard.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/recipe-config/recipe-config.module').then((m) => m.RecipeConfigModule),
    canActivate: [RequireAuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
    canActivate: [RequireAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
