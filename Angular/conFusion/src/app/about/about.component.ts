import { Component, OnInit } from '@angular/core';
import { leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leader: leader[] | undefined;

  selectedleader : leader | undefined;

  constructor(private leaderservice : LeaderService) { }

  ngOnInit(): void {
    this.leaderservice.getleaders()
    .subscribe(leader => this.leader = leader);
  }

  onSelect(Leader: leader) {
    this.selectedleader = Leader;
  }
  
}
