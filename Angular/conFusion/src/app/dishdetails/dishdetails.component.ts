import { Component,  OnInit, ViewChild } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from 'src/app/Shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { Comment } from '../Shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls:  ['./dishdetails.component.scss']
})
export class DishdetailsComponent implements OnInit {
  
    dish!: Dish;
    dishIds!: string[];
    prev!: string;
    next!: string;
    commentForm: FormGroup;
    comment: Comment;

    @ViewChild('fform') commentFormDirective;
    
    formErrors={
      'author': '',
      // 'rating': '',
      'comment': '',
    }
  
    validationMessages={
      'author':{
        'required': 'Author Name is required',
        'minlength': 'Author Name must be atleast 2 characters long',
        'maxlength': 'Author Name should not exceed 25 characters in length',
      },
      // 'rating':{
      // },
      'comment':{
        'required': 'Comment is required.',
        'minlength': 'Author Name must be atleast 2 characters long',
      }
    }

   constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private cf: FormBuilder) { this.createForm();}

  ngOnInit() {
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
   this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))  
     .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  createForm() {
    this.commentForm = this.cf.group({
      rating: 5 ,
      comment:  ['', [Validators.required, Validators.minLength(2)] ],
      author:  ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(25),] ],
      date: [''],
    });
    this.commentForm.valueChanges
    .subscribe(data=> this.onValueChanged(data));
  
  this.onValueChanged();
  }
  onValueChanged(data?: any){
    if(!this.commentForm){return ;}
    const form= this.commentForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';  //clear previous error messages, if any
        const control= form.get(field)
        if (control && control.dirty && !control.valid){
          const messages= this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment['date']= (new Date()).toDateString();
    this.dish.comments.push(this.comment);
    console.log(this.dish);
    console.log(this.comment);
    this.commentForm.reset({
     rating: 5,
     comment: ' ',
     author: ' ', 
     date: '',
  });
  this.commentFormDirective.resetForm();
  }


}
