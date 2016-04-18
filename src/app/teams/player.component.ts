import {Component} from "angular2/core";
import {Player} from "./model";
import {Input} from "angular2/core";

@Component({
    selector: 'player-details',
    templateUrl: `app/teams/player-details.html`
})
export class PlayerDetailsComponent {

    @Input()
    player: Player;


}