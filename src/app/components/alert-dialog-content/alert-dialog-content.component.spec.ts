import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogContentComponent } from './alert-dialog-content.component';

describe('AlertDialogContentComponent', () => {
  let component: AlertDialogContentComponent;
  let fixture: ComponentFixture<AlertDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
