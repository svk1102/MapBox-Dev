import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HeatmapLayerComponent } from './heatmap-layer/heatmap-layer.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'heatmap', component: HeatmapLayerComponent },
  // { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
