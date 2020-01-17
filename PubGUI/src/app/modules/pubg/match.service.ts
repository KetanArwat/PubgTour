import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from './match';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    match: Match;
    pubgEndpoint: string;
    apiKey: string;
    springEndpoint: string;
    pubgApiHeader: HttpHeaders = new HttpHeaders({
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiYzQzY2FkMC0zMWJhLTAxMzctNDFmOC0wMDU3NDUzNGQzNjMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTUzNTgwMTgxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii03YTk3ZThjNi1jNTlhLTRkNTItOWNhNC01ZWZmN2U5NWU4NzUifQ.PWPsmAfb5rh7mwazVz-tMjgsXg8nHPsAUaGl2HOGung",
        "Accept": "application/vnd.api+json"
    });

    springEndPointHeader: HttpHeaders = new HttpHeaders({
        "Authorization": "Bearer " + this.authService.getToken(),
    });



    constructor(private http: HttpClient, private authService: AuthenticationService) {
        this.apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiYzQzY2FkMC0zMWJhLTAxMzctNDFmOC0wMDU3NDUzNGQzNjMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTUzNTgwMTgxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii03YTk3ZThjNi1jNTlhLTRkNTItOWNhNC01ZWZmN2U5NWU4NzUifQ.PWPsmAfb5rh7mwazVz-tMjgsXg8nHPsAUaGl2HOGung";
        this.pubgEndpoint = "https://api.pubg.com/";
        this.springEndpoint = "http://localhost:8080/api/v1/matchservice";
        this.match = new Match();
    }

    getTournaments() {
        const url = this.pubgEndpoint + "tournaments";
        return this.http.get(url, { headers: this.pubgApiHeader })
            .pipe(map(this.pickTournaments));
    }

    pickTournaments(response) {
        return response["data"];
    }

    getTournamentById(tourid: string) {
        const headers = new HttpHeaders();
        const url = this.pubgEndpoint + "tournaments/" + tourid;
        return this.http.get(url, { headers: this.pubgApiHeader })
    }


    getMatchById(matchId: string) {
        const headers = new HttpHeaders();
        const url = this.pubgEndpoint + "shards/tournament/matches/" + matchId;
        return this.http.get(url, { headers: this.pubgApiHeader })
    }

    addMatchToWatchlist(match) {
        this.match.createdAt = match['data']['attributes']['createdAt'];
        this.match.gameMode = match['data']['attributes']['gameMode'];
        this.match.id = match['data']['id'];
        this.match.mapName = match['data']['attributes']['mapName'];
        this.match.titleId = match['data']['attributes']['titleId'];


        return this.http.post(this.springEndpoint + "/match", this.match, { headers: this.springEndPointHeader });

    }

    getWatchlistedMatches(): Observable<Array<Match>> {
        return this.http.get<Array<Match>>(this.springEndpoint + "/matches", { headers: this.springEndPointHeader });
    }

    deleteFromMyWatchList(match: Match) {
        const url = this.springEndpoint + "/" + match.id + "/" + match.userId;
        return this.http.delete(url, { responseType: 'text', headers: this.springEndPointHeader });
    }

}
