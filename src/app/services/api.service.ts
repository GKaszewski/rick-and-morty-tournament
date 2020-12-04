import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs';

interface RateCharactersData {
    winner: Character;
    loser: Character;
}

@Injectable()
export class ApiService {
    private apiRoot = 'http://localhost:5000';

    constructor(private http: HttpClient) { }

    fetchCharactersFromAPI() {
        return this.http.get(this.apiRoot.concat('/fetch-characters/'), { responseType: 'text' });
    }

    getCharacters(): Observable<Character[]> {
        return this.http.get<Character[]>(this.apiRoot.concat('/characters/'));
    }

    rateCharacters(data: RateCharactersData) {
        return this.http.post(this.apiRoot.concat('/rate/'), data, { responseType: 'text' });
    }
}