import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { FormsModule } from '@angular/forms';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { By } from '@angular/platform-browser';


describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CategoryComponent,
        InlineEditComponent
      ],
      imports: [
        FormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync expense name input field to "name" in component', async(() => {
    const el: HTMLElement = fixture.nativeElement;
    
    const inputs = el.querySelectorAll('input');
    
    fixture.whenStable().then(() => {
      inputs[0].value = 'Expense';
      inputs[0].dispatchEvent(new Event('input'));
      
      expect(component.name).toBe('Expense');
    })
  }));

  it('should sync expense amount input field to "amount" in component', async(() => {
    const el: HTMLElement = fixture.nativeElement;
    
    const inputs = el.querySelectorAll('input');
    
    fixture.whenStable().then(() => {
      inputs[1].valueAsNumber = 300;
      inputs[1].dispatchEvent(new Event('input'));
      
      expect(component.amount).toBe(300);
    })
  }));

  it('should update expenses upon clicking the button', async(() => {
    const el: HTMLElement = fixture.nativeElement;
    component.expenses = {};
    component.name = 'Expense';
    component.amount = 300;

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.expenses).toEqual({
      Expense: 300
    })
  }));

  it('should trigger an event change upon clicking the button', async(() => {
    const el: HTMLElement = fixture.nativeElement;
    let wasCalled = false;
    component.expenses = {};
    component.name = 'Expense';
    component.amount = 300;
    component.newExpenses.subscribe( () => wasCalled = true);

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(wasCalled).toBeTruthy();
  }));
});
