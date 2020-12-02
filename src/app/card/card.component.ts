import { state, style, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input()
  isRight: boolean = false;
  @Input() data: Character;
  @Input() isClicked = false;

  constructor() { }

  ngOnInit(): void {
  }
}
