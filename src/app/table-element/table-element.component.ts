import { Component, Input } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss']
})
export class TableElementComponent {
  @Input()
  character: Character;
}
