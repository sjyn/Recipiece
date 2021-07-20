import {Component, Input, OnInit} from '@angular/core';
import {IRecipe} from '../../../api/model/recipe';

@Component({
  selector: 'app-config-recipe-steps',
  templateUrl: './config-recipe-steps.component.html',
  styleUrls: ['./config-recipe-steps.component.sass'],
})
export class ConfigRecipeStepsComponent implements OnInit {
  @Input() recipe: IRecipe;

  readonly maxStepLen = 1000;

  readonly lengthUnits = {
    m: {
      singular: 'Minute',
      plural: 'Minutes',
      max: 60,
    },
    h: {
      singular: 'Hour',
      plural: 'Hours',
      max: 24,
    },
    d: {
      singular: 'Day',
      plural: 'Days',
      max: 7,
    },
    w: {
      singular: 'Week',
      plural: 'Weeks',
      max: 52,
    },
    s: {
      singular: 'Second',
      plural: 'Seconds',
      max: 60,
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    if (this.recipe.steps === null || this.recipe.steps === undefined) {
      this.recipe.steps = [];
    }
  }

  public addStep() {
    this.recipe.steps.push({
      content: '',
      length: {
        time: undefined,
        unit: 'm',
      },
    });
  }

  public removeStep(index: number) {
    this.recipe.steps = this.recipe.steps.filter((_, idx: number) => idx !== index);
  }

  public getHintForTimeInput(index: number): string {
    const step = this.recipe.steps[index];
    const unit = this.lengthUnits[step.length.unit];
    return `How many ${unit.plural}?`;
  }

  public getDisplayForOption(stepIndex: number, valueKey: string): string {
    const step = this.recipe.steps[stepIndex];
    return step.length.time !== 1 ? this.lengthUnits[valueKey].plural : this.lengthUnits[valueKey].singular;
  }

  public getMaxForTime(stepIndex: number): number {
    return this.lengthUnits[this.recipe.steps[stepIndex].length.unit].max;
  }

}
