import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { AuthGuardService } from '../../authGuard.service';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
const routes: Routes = [
    {
        path: 'pubg',
        children: [
            {
                path: '',
                redirectTo: 'pubg/tournaments',
                pathMatch: 'full',
            },
            {
                path: 'tournaments',
                component: TournamentsComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'matches/:tId',
                component: TournamentDetailsComponent,
                canActivate: [AuthGuardService],

            },
            {
                path: 'match/:mId',
                component: MatchDetailsComponent,
                canActivate: [AuthGuardService],

            },
            {
                path: 'favourites',
                component: WatchlistComponent,
                canActivate: [AuthGuardService],

            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PubgRoutingModule { }