import {TeamComponent} from "../team.component";
import {ApiClient} from "../football.api.client";
import {Observable} from "rxjs/Observable";


describe('TeamComponent', () => {

    var apiClient, responseBody, getTeamSpy;

    beforeEach(function () {
        apiClient = {
            getTeam: () => {
            }
        };

        responseBody = {
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
                observer.next(responseBody);
                observer.complete();
            })
        );
    });

    it('should load team if teamId is present', () => {
        let teamComponent = new TeamComponent(apiClient);
        teamComponent.teamId = "100";
        teamComponent.load();

        expect(teamComponent.team).toEqual(responseBody);
        expect(getTeamSpy.calls.count()).toBe(1)
    });

    it('should not load team if teamId is not present', () => {
        let teamComponent = new TeamComponent(apiClient);
        teamComponent.load();

        expect(teamComponent.team).toBeUndefined()
        expect(getTeamSpy.calls.count()).toBe(0)
    });

});