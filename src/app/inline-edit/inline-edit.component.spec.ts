import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditComponent } from './inline-edit.component';
import { By } from '@angular/platform-browser';

describe('InlineEditComponent', () => {
  let component: InlineEditComponent;
  let fixture: ComponentFixture<InlineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly enter edit mode upon click', () => {
    component.isEditMode = false;
    fixture.detectChanges();
    const spanDE = fixture.debugElement.query(By.css('#display-mode-wrapper'));
          
    spanDE.triggerEventHandler('click', null);
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('#edit-mode-wrapper'));

    expect(span).not.toBeNull();  
  });

  it('should properly exit edit mode upon enter', () => {
    component.isEditMode = true;
    fixture.detectChanges();
    const inputDE = fixture.debugElement.query(By.css('#input'));
    
    inputDE.triggerEventHandler('keyup.enter', null);
    fixture.detectChanges();

    const spanDE = fixture.debugElement.query(By.css('#display-mode-wrapper'));   
    expect(spanDE).not.toBeNull();      
  });

  it('should emit the new value when exiting edit mode', () => {
    component.isEditMode = true;
    let newValue: string;
    component.valueChange.subscribe( value => newValue = value);
    fixture.detectChanges();
    
    const inputDE = fixture.debugElement.query(By.css('#input'));
    component.value = 'New';
    inputDE.triggerEventHandler('keyup.enter', null);
    fixture.detectChanges();

    expect(newValue).toBe(component.value);      
  });

  it('should display the value as string when currency is false', () => {
    component.value = 'Expense';
    component.isCurrency = false;

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const span = el.querySelector('#non-currency-wrapper');
    expect(span.innerHTML).toBe(' Expense ');

  });

  it('should display the value as shekel when currency is true', () => {
    component.value = 100;
    component.isCurrency = true;

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const span = el.querySelector('#currency-wrapper');
    expect(span.innerHTML).toBe(' ₪' + 100 + '.00 ');

  });
});
