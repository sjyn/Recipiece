import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface AdvanceSearchConfig {
  search: boolean;
  name?: string;
  tags?: string[];
}

@Component({
  selector: 'app-advanced-search-modal',
  templateUrl: './advanced-search-modal.component.html',
  styleUrls: ['./advanced-search-modal.component.sass'],
})
export class AdvancedSearchModalComponent implements OnInit {

  public config: AdvanceSearchConfig;
  public readonly separatorKeysCodes = [ENTER, COMMA]

  constructor(
    private dialogRef: MatDialogRef<AdvancedSearchModalComponent>,
  ) {

  }

  ngOnInit(): void {
    this.config = {
      search: true,
      tags: [],
      name: '',
    };
  }

  public addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim().toLowerCase();
    if (value !== '' && !this.config.tags.includes(value)) {
      this.config.tags.push(value);
    }
    event.chipInput.clear();
  }

  public removeTag(tag: string) {
    this.config.tags = this.config.tags.filter((t) => t !== tag);
  }

  public cancel() {
    this.dialogRef.close(<AdvanceSearchConfig> {
      search: false,
    });
  }

  public search() {
    this.dialogRef.close(this.config);
  }

}
