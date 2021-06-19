import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-steps-view',
  templateUrl: './steps-view.component.html',
  styleUrls: ['./steps-view.component.sass'],
})
export class StepsViewComponent implements OnInit {
  @ViewChild(MatAccordion) stepsPanel: MatAccordion;
  @Input() recipe: IRecipe;

  constructor() {
  }

  ngOnInit(): void {
  }

  public openAll() {
    this.stepsPanel.openAll();
  }

  public closeAll() {
    this.stepsPanel.closeAll();
  }

}
