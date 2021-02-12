import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile.component';
import {PasswordChangeComponent} from './password-change/password-change.component';


const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
  {
    path: 'password-change',
    component: PasswordChangeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {
}
