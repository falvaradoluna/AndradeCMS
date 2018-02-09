import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminuevoComponent } from './seminuevo.component';

describe('SeminuevoComponent', () => {
  let component: SeminuevoComponent;
  let fixture: ComponentFixture<SeminuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
