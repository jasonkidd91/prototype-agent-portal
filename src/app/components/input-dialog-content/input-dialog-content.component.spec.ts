import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDialogContentComponent } from './input-dialog-content.component';

describe('InputDialogContentComponent', () => {
  let component: InputDialogContentComponent;
  let fixture: ComponentFixture<InputDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
