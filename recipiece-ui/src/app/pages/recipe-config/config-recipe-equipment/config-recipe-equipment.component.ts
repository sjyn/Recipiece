import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';

@Component({
  selector: 'app-config-recipe-equipment',
  templateUrl: './config-recipe-equipment.component.html',
  styleUrls: ['./config-recipe-equipment.component.sass']
})
export class ConfigRecipeEquipmentComponent implements OnInit {
  @Input() public recipe: IRecipe;

  constructor() { }

  ngOnInit(): void {
  }

}
