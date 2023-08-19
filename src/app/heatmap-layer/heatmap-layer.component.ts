import { Component , OnInit} from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
// import { ScatterplotLayer } from '@deck.gl/layers';



@Component({
  selector: 'app-heatmap-layer',
  templateUrl: './heatmap-layer.component.html',
  styleUrls: ['./heatmap-layer.component.css']
})
export class HeatmapLayerComponent implements OnInit{

  map!:mapboxgl.Map;

  

  loadMap(){
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1Ijoic2hyaXBhZGt1bGthcm5pIiwiYSI6ImNsbGFwMnp0dTF0azMzZmxvOWo4ZTZ4c2kifQ.CypBxgcMJ3Kw5Y473fn35w';
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [77.466794,22.4414506], // starting position [lng, lat]
      zoom: 5, // starting zoom
      projection: {
        name: 'mercator'
    }
    })

    this.map.addControl(
      new MapboxGeocoder({
        accessToken:mapboxgl.accessToken,
        mapboxgl:mapboxgl
      })
    );

    this.map.on('load',()=> {
      this.map.setFog({});
    })

    // const deck = new Deck({
    //   canvas: this.map.getCanvas(),
    //   initialViewState: {
    //     longitude: -122.45,
    //     latitude: 37.8,
    //     zoom: 12
    //   },
    //   controller: true, // Allow map interactions to control deck.gl
    //   layers: [
    //     new ScatterplotLayer({
    //       id: 'scatterplot-layer',
    //       data: [], // Your scatterplot data
    //       getPosition: (d:any) => [d.longitude, d.latitude],
    //       getRadius: (d:any) => 100,
    //       getColor: (d:any) => [255, 0, 0],
    //       pickable: true // Allow interaction with the layer
    //     })
    //   ]
    // });
  }

  ngOnInit(): void {
    this.loadMap();
  }
}
