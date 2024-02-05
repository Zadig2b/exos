
import { NBA } from './nba.js';

export class Player {
    constructor(name, img, skill){
        this.name = name
        this.img = img
        this.skill = skill
    }

}

export class Team extends NBA {
    constructor(league, name, img) {
        super(league);
        this.name = name;
        this.img = img;
        this.player = new Player();
    }
}