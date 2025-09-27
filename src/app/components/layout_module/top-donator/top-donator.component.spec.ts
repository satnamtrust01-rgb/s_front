import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDonatorComponent } from './top-donator.component';

describe('TopDonatorComponent', () => {
  let component: TopDonatorComponent;
  let fixture: ComponentFixture<TopDonatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopDonatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
