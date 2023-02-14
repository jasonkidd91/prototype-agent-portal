import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogContentComponent } from './modal-dialog-content.component';

describe('ModalDialogContentComponent', () => {
  let component: ModalDialogContentComponent;
  let fixture: ComponentFixture<ModalDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
