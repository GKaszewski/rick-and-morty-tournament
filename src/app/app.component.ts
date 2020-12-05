import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from './models/character.model';
import { ApiService } from './services/api.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Rick and Morty Tournament';
  private fetchSub: Subscription;
  private charactersSub: Subscription;
  private rateSub: Subscription;
  private lastPairIndicies: number[] = [0, 0];

  characters: Character[] = [];
  rivals: Character[] = [];
  currentYear = 0;
  voting = false;
  votedLeft = false;
  skipped = false;

  constructor(private api: ApiService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.setCharacters();
    this.currentYear = new Date().getFullYear();
  }

  ngOnDestroy(): void {
    if (this.fetchSub) this.fetchSub.unsubscribe();
    if (this.charactersSub) this.charactersSub.unsubscribe();
    if (this.rateSub) this.rateSub.unsubscribe();
  }

  private getRandomIndex() {
    return Math.floor(Math.random() * this.characters.length);
  }

  private setLastIndicies(firstIndex: number, secondIndex: number) {
    this.lastPairIndicies[0] = firstIndex;
    this.lastPairIndicies[1] = secondIndex;
  }

  private generateIndicies() {
    let firstIndex = this.getRandomIndex();
    let secondIndex = this.getRandomIndex();
    return [firstIndex, secondIndex];
  }

  private getRandomPair() {
    let pair: Character[] = [];
    let indicies: number[] = this.generateIndicies();

    let firstIndiciesAreTheSame = indicies[0] === this.lastPairIndicies[0];
    let secondIndiciesAreTheSame = indicies[1] === this.lastPairIndicies[1];

    while (firstIndiciesAreTheSame || secondIndiciesAreTheSame) {
      this.generateIndicies();
    }

    pair[0] = this.characters[indicies[0]];
    pair[1] = this.characters[indicies[1]];
    while (pair[1] === pair[0]) this.characters[this.getRandomIndex()];
    this.setLastIndicies(indicies[0], indicies[1]);
    return pair;
  }

  private generateNewRivals() {
    this.rivals = this.getRandomPair();
  }

  private setCharacters() {
    this.charactersSub = this.api.getCharacters().subscribe(res => {
      this.characters = res;
      this.generateNewRivals();
    });
  }

  private setCharactersAfterVoting() {
    this.charactersSub = this.api.getCharacters().subscribe(res => {
      this.characters = res;
      this.generateNewRivals();
      setTimeout(() => {
        this.voting = false;
      }, 1000);
    });
  }

  rateCharacters(winnerIndex: number, loserIndex: number) {
    if (this.voting) { console.log('Cant do it'); return; }
    this.voting = true;

    if (winnerIndex == 0) this.votedLeft = true;
    else this.votedLeft = false;

    this.rateSub = this.api.rateCharacters({ winner: this.rivals[winnerIndex], loser: this.rivals[loserIndex] }).subscribe(() => {
      this.setCharactersAfterVoting();
    });

  }

  skip() {
    this.skipped = true;
    setTimeout(() => {
      this.skipped = false;
      this.generateNewRivals();
    }, 1000);
  }
}
