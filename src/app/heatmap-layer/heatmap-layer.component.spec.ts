import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapLayerComponent } from './heatmap-layer.component';

describe('HeatmapLayerComponent', () => {
  let component: HeatmapLayerComponent;
  let fixture: ComponentFixture<HeatmapLayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatmapLayerComponent]
    });
    fixture = TestBed.createComponent(HeatmapLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
