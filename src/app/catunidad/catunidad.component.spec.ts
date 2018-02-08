import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatunidadComponent } from './catunidad.component';

describe('CatunidadComponent', () => {
  let component: CatunidadComponent;
  let fixture: ComponentFixture<CatunidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatunidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
