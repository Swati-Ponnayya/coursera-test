import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Promotion } from '../Shared/promotion';
import { PROMOTIONS } from '../Shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions():  Observable< Promotion[] >{
    return of(PROMOTIONS).pipe(delay(2000));
 
  }
  getPromotion(id: string): Observable< Promotion> {
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));

  }

  getFeaturedPromotion(): Observable< Promotion> {
    return  of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  
  }
}
