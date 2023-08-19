import { Component,OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  title = 'mapbox-ng';
  hoverStateId:any;
  
  popup1 = new mapboxgl.Popup({offset:25}).setText('Built in 1992');

  map!:mapboxgl.Map;

  constructor(private data:DataService){}

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

      this.map.addSource('india-data',{
        type:'geojson',
        data:'../assets/data/india_district.geojson',
        promoteId:'ID_2'
      })

      this.map.addLayer({
        id:'india-data-line',
        type:'line',
        source:'india-data',
        paint:{
          'line-color':'black',
          'line-width':4,
          'line-opacity':0.7
        },
        layout:{
          visibility:'visible'
        }
      },'road-label')
      this.map.addLayer({
        id:'india-data-fill',
        type:'fill',
        source:'india-data',
        paint:{
          'fill-color':'lightyellow',
          'fill-opacity':[ 
            'case',
            ['boolean',['feature-state','hover'],false],
            1,0.5
          ]
        },
        layout:{
          visibility:'visible'
        }
      },'india-data-line')
      this.map.on('click',(e: { point: any; }) => {
        const [features]  = this.map.queryRenderedFeatures(e.point,{layers:['india-data-fill']})
        
        if(features){
          if(features.properties) alert(features.properties["NAME_2"])
        }
        
      })

      this.map.on('mousemove','india-data-fill',(e) => {
        if(e.features !==undefined)
        if(e.features?.length > 0){
          if(this.hoverStateId !== null){
            this.map.setFeatureState(
              {source:'india-data',id:this.hoverStateId},
              {hover:false}
            );
            this.hoverStateId = e.features[0].id;

            this.map.setFeatureState(
              {source:'india-data',id:this.hoverStateId},
              {hover:true}
            )
          }
        }
      })

    })

    new mapboxgl.Marker({
      color:"#90fa7a",
      scale:0.6
    })
    .setLngLat([72.833143,19.006386])
    .setPopup(this?.popup1)
    .addTo(this?.map);

    this.data.getData().subscribe(res => {
      res.data.forEach((d:any) => {
        new mapboxgl.Marker({
          color:'#90fa7a',
          scale:0.5
        })
        .setLngLat([d.longitude,d.latitude])
        .setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<div>Place : ${d.name} </div> <div> Infected : ${d.infected}</div> <div> Recovered : ${d.recovered}</div>`))
        .addTo(this.map);
      })
    })
  }

  gotoOffice(){
    this.map.flyTo({
      center:[72.833143,19.006386],
      zoom:15,
      // pitch:45
    })
  }
  reset(){
    this.map.flyTo({
      center:[77.466794,22.4414506],
      zoom:5,
      // pitch:45
    })
  }

  toggleBoundaires(){
    var isVisible = this.map.getLayoutProperty('india-data-fill','visibility') === 'visible'
    if(isVisible){
      this.map.setLayoutProperty('india-data-fill','visibility','none');
      this.map.setLayoutProperty('india-data-line','visibility','none')
    }else{
      this.map.setLayoutProperty('india-data-fill','visibility','visible');
      this.map.setLayoutProperty('india-data-line','visibility','visible');
    }
  }

  ngOnInit(): void {
    this.loadMap();
    this.data.getData().subscribe(res => {
      console.log(res)
      
    })
  }
}
