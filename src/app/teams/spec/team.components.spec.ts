import {TeamComponent} from "../team.component";
import {ApiClient} from "../football.api.client";
import {Observable} from "rxjs/Observable";

describe('TeamComponent', () => {

    let apiClient;
    let getTeamsBySeasonIdSpy, getTeamsBySeasonIdResponseBody;
    let getTeamSpy, getTeamResponseBody;

    beforeEach(function () {
        apiClient = {
            getTeam: () => {
            },
            getTeamsBySeasonId: () => {
            }
        };

        getTeamsBySeasonIdResponseBody = [
            {
                id: null,
                name: "Hellas Verona FC",
                code: null,
                shortName: "H. Verona",
                marketValue: "39,350,000 €",
                logoUrl: "http://upload.wikimedia.org/wikipedia/de/a/a2/Hellas_Verona_1903_FC.svg",
                players: null
            }];

        getTeamsBySeasonIdSpy = spyOn(apiClient, 'getTeamsBySeasonId').and.returnValue(
            Observable.create(observer => {
                observer.next(getTeamsBySeasonIdResponseBody);
                observer.complete();
            })
        );

        getTeamResponseBody = {
            name: "AS Roma",
            code: "ROM",
            shortName: "Rom",
            marketValue: "261,700,000 €",
            logoUrl: "http://upload.wikimedia.org/wikipedia/de/3/32/AS_Rom.svg",
            players: [
                {
                    name: "Ervin Zukanovic",
                    position: "Centre Back",
                    jerseyNumber: 87,
                    dateOfBirth: "1987-02-11",
                    nationality: "Bosnia-Herzegovina",
                    contractUntil: "2016-06-30",
                    marketValue: "4,000,000 €"
                }]
        };


        getTeamSpy = spyOn(apiClient, 'getTeam').and.returnValue(
            Observable.create(observer => {
                observer.next(getTeamResponseBody);
                observer.complete();
            })
        );
    });

    it('should load teams when created', () => {
        let teamComponent = new TeamComponent(apiClient);

        expect(teamComponent.teams).toEqual(getTeamsBySeasonIdResponseBody);
        expect(getTeamsBySeasonIdSpy.calls.count()).toBe(1);
    });

    it('should load team if teamId is present', () => {
        let teamComponent = new TeamComponent(apiClient);
        teamComponent.teamId = "100";
        teamComponent.load();

        expect(teamComponent.team).toEqual(getTeamResponseBody);
        expect(getTeamSpy.calls.count()).toBe(1);
    });

    it('should not load team if teamId is not present', () => {
        let teamComponent = new TeamComponent(apiClient);
        teamComponent.load();

        expect(teamComponent.team).toBeUndefined();
        expect(getTeamSpy.calls.count()).toBe(0);
    });

    it('should load team when user picks a team', () => {
        let teamId = "100";
        let teamComponent = new TeamComponent(apiClient);

        teamComponent.onChange(teamId);

        expect(teamComponent.teamId).toEqual(teamId);
        expect(teamComponent.team).toEqual(getTeamResponseBody);
        expect(getTeamSpy.calls.count()).toBe(1);
    });


});