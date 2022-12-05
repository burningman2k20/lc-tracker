import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovSitesComponent } from './gov-sites.component';

describe('GovSitesComponent', () => {
  let component: GovSitesComponent;
  let fixture: ComponentFixture<GovSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovSitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
