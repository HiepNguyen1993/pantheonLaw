import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCopyRightComponent } from './footer-copy-right.component';

describe('FooterCopyRightComponent', () => {
  let component: FooterCopyRightComponent;
  let fixture: ComponentFixture<FooterCopyRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCopyRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCopyRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
