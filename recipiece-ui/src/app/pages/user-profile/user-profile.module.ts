import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserProfileRoutingModule} from './user-profile-routing.module';
import {UserProfileComponent} from './user-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {PasswordChangeComponent} from './password-change/password-change.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DeleteAccountModalComponent} from './modals/delete-account-modal/delete-account-modal.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [UserProfileComponent, PasswordChangeComponent, DeleteAccountModalComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
  ],
  entryComponents: [
    DeleteAccountModalComponent,
  ],
})
export class UserProfileModule {
}
