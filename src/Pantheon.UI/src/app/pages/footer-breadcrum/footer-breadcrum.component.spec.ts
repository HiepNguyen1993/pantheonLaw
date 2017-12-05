import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBreadcrumComponent } from './footer-breadcrum.component';

describe('FooterBreadcrumComponent', () => {
  let component: FooterBreadcrumComponent;
  let fixture: ComponentFixture<FooterBreadcrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBreadcrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
