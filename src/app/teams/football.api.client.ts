import {Team} from "./model";
import {Observable} from "rxjs/Observable";
import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";

@Injectable()
export class ApiClient {

    constructor(private http:Http) {
    }

    getTeam(teamId:string):Observable<Team> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(`http://football-api.cfapps.io/teams/${teamId}`, {headers}).map(res => res.json());
    }

    getTeamsBySeasonId(seasonId:string):Observable<Team[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(`http://football-api.cfapps.io/teams?seasonId=${seasonId}`, {headers}).map(res => res.json());
    }
}