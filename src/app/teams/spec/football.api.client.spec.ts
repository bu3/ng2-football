import {injectAsync, it, describe, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {XHRBackend} from "angular2/http";
import {RequestMethod} from "angular2/http";
import {ResponseOptions} from "angular2/http";
import {HTTP_PROVIDERS} from "angular2/http";
import {MockBackend} from "angular2/src/http/backends/mock_backend";
import {provide} from "angular2/core";
import {ApiClient} from "../football.api.client"


describe('ApiClient', () => {

    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            ApiClient
        ];
    });

    it("should load teams by season id", injectAsync([XHRBackend, ApiClient], (mockBackend, apiClient) => {
        let seasonId = 401;
        var responseBody = [
            {
                id: null,
                name: "Hellas Verona FC",
                code: null,
                shortName: "H. Verona",
                marketValue: "39,350,000 €",
                logoUrl: "http://upload.wikimedia.org/wikipedia/de/a/a2/Hellas_Verona_1903_FC.svg",
                players: null
            }];

        return new Promise(
            (resolve) => {
                let teamId = 1;
                mockBackend.connections.subscribe(connection => {
                    expect(connection.request.url.toString()).toEqual(`http://football-api.cfapps.io/teams?seasonId=${seasonId}`);
                    expect(connection.request.method).toEqual(RequestMethod.Get);

                    connection.mockRespond(new ResponseOptions({status: 200, body: responseBody}));
                    resolve();
                });

                apiClient.getTeamsBySeasonId(seasonId).subscribe(
                    {
                        next: teams => {
                            expect(teams).toEqual(responseBody)
                        }
                    }
                );
            }
        );
    }));

    it("should load team", injectAsync([XHRBackend, ApiClient], (mockBackend, apiClient) => {
        var responseBody = {
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

        return new Promise(
            (resolve) => {
                let teamId = 1;
                mockBackend.connections.subscribe(connection => {
                    expect(connection.request.url.toString()).toEqual(`http://football-api.cfapps.io/teams/${teamId}`);
                    expect(connection.request.method).toEqual(RequestMethod.Get);

                    connection.mockRespond(new ResponseOptions({status: 200, body: responseBody}));
                    resolve();
                });

                apiClient.getTeam(teamId).subscribe(
                    {
                        next: team => {
                            expect(team).toEqual(responseBody)
                        }
                    }
                );
            }
        );
    }));
});