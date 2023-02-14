import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { leader } from '../Shared/leader';
import { LEADER } from '../Shared/ledears';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getleaders(): Observable < leader[]> {
    return of( LEADER).pipe(delay(2000));
  }

  getleader(id: string):Observable < leader >{
    return of(LEADER.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedleader():Observable< leader >{
    return of(LEADER.filter((leader) => leader.featured)[0]).pipe(delay(2000)); 
  }
}
