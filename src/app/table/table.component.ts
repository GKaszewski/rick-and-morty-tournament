import { Component, Input } from '@angular/core';
import { Character } from '../models/character.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  characters: Character[] = [];
}
