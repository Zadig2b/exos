
import { NBA } from './nba.js';

export class Player {
    constructor(name, img){
        this.name = name
        this.img = img
    }

}

export class Team extends NBA {
    constructor(league, name, img, color) {
        super(league);
        this.name = name;
        this.img = img;
        this.color = color
    }
}