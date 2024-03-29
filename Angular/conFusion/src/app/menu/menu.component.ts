import { Component, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {
  
  dishes: Dish[] | undefined;

  selectedDish : Dish | undefined;

  constructor( private dishservice: DishService) { }

  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe(dishes => this.dishes = dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
