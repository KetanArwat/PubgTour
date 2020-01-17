import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MatchService } from './match.service';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PubgRoutingModule } from './pubg.routing';


@NgModule({
  declarations: [WatchlistComponent, TournamentsComponent, TournamentDetailsComponent, MatchDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule, FormsModule, MatInputModule
  ],
  exports: [TournamentsComponent, TournamentDetailsComponent, MatchDetailsComponent, PubgRoutingModule],
  providers: [MatchService]
})
export class PubgModule { }
