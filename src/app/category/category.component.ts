import { Component, OnInit, Input } from '@angular/core';
import { BudgetItems } from 'src/modules/budget';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input('items') items: BudgetItems;

  constructor() { }

  ngOnInit() {
  }

}
