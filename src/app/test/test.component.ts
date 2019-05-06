import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  items = {
    Ami: 30,
    Shoshi: 30,
    Dave: 30,
    Chai: 30,
  }



  constructor() { }

  ngOnInit() {
  }

  add() {
    this.items['Test'] = 30;
  }

  remove() {
    delete this.items['Test'];
  }

}
