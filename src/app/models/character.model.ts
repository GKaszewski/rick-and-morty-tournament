import Location from './location.model';
import { Origin } from './origin.model';

export class Character {
    _id: number;
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
    eloRating: number;
}