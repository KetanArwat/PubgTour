import { Component, OnInit } from '@angular/core';
import { Match } from '../../match';
import { MatchService } from '../../match.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'match-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  userName: any;
  matches: Array<Match>
  constructor(private service: MatchService, private snackbar: MatSnackBar) {
    this.matches = [];
  }

  ngOnInit() {
    this.service.getWatchlistedMatches()
      .subscribe((matches) => {
        this.matches.push(...matches);
      })

    this.userName = localStorage.getItem("userId");

  }
  deleteFromWatchList(match) {
    this.service.deleteFromMyWatchList(match).subscribe((result) => {
      let message = `${match.titleId} has been deleted`;
      this.snackbar.open(message, '', {
        duration: 1000
      });
      const index = this.matches.indexOf(match);
      this.matches.splice(index, 1);
    });

  }

}
