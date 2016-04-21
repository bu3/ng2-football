import {Component} from 'angular2/core';
import {Team} from './model';
import {Player} from './model';
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from "angular2/http";
import {PlayerDetailsComponent} from "./player.component";
import {ApiClient} from "./football.api.client";

@Component({
    selector: 'team-component',
    templateUrl: `app/teams/team.html`,
    directives: [PlayerDetailsComponent]
})
export class TeamComponent {

    teamId:string;

    team:Team;

    constructor(private apiClient:ApiClient) {
    }

    load():void {
        if (this.teamId) {
            this.apiClient.getTeam(this.teamId).subscribe(
                {
                    next: team => this.team = team,
                    error: error => console.log(error)
                }
            );
        }
    }
}