import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeBuildComponent } from './we-build.component';

describe('WeBuildComponent', () => {
  let component: WeBuildComponent;
  let fixture: ComponentFixture<WeBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeBuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
