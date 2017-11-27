import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsGridComponent } from './js-grid.component';

describe('JsGridComponent', () => {
  let component: JsGridComponent;
  let fixture: ComponentFixture<JsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
