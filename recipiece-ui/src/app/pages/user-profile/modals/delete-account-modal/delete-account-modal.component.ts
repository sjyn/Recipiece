import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IRecipeBook} from '../../../../api/model/recipe-book';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.sass'],
})
export class DeleteAccountModalComponent implements OnInit {
  public actualEmail: string;

  public get disableDelete(): boolean {
    return this.actualEmail !== this.data.email;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public dialogRef: MatDialogRef<DeleteAccountModalComponent>,
  ) {
  }

  ngOnInit(): void {
    this.actualEmail = '';
  }

  public deleteAccount() {
    this.dialogRef.close(true);
  }

  public cancel() {
    this.dialogRef.close(false);
  }

}
