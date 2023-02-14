import { Component, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../Shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  dish: Dish | undefined;
  promotion: Promotion | undefined;
  Leader: leader | undefined;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService  ) { }

  ngOnInit(): void {
    
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish);
   this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);
   this.leaderService.getFeaturedleader()
    .subscribe(Leader => this.Leader = Leader);
  }
  

}
