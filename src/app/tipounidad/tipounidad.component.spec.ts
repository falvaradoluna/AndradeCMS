import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipounidadComponent } from './tipounidad.component';

describe('TipounidadComponent', () => {
  let component: TipounidadComponent;
  let fixture: ComponentFixture<TipounidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipounidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipounidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
