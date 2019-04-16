import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.css']
})
export class InlineEditComponent {

  @Input('initialValue') value;
  @Input('type') type = 'text';
  @Output() valueChange = new EventEmitter();

  isEditMode = false;

  enterEditMode() {
    this.isEditMode = true;
  }

  emitNewValueAndExitEditMode() {
    this.isEditMode = false;
    this.valueChange.emit(this.value);
  }

 }
