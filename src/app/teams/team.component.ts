import {Component} from 'angular2/core';
import {Team} from './model';
import {Player} from './model';
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from "angular2/http";
import {PlayerDetailsComponent} from "./player.component";

@Component({
    selector: 'team-component',
    templateUrl: `app/teams/team.html`,
    directives: [PlayerDetailsComponent]
})

export class TeamComponent {

    teamId:string;

    team:Team;

    constructor(private _http:Http) {
        this.team = <Team> {players: []}
    }

    load():void {
        let headers = new Headers({'Content-Type': 'application/json'});

        if (this.teamId) {
            this._http.get("http://football-api.cfapps.io/teams/"+this.teamId, {headers}).subscribe(
                (res:Response) => this.team = res.json(),
                (error) => console.log(error),
                ()=> console.log('Team loading complete'));
        }
    }

}