import React from "react";
import L from 'leaflet';
import { Map, LayersControl, ScaleControl} from "react-leaflet";
import GeojsonLayer from './GeojsonLayer';
import GeojsonBase from './GeojsonBasemap';
import GeojsonWater from './Water';
import GeojsonRoads from './Roads';
import GeojsonRussia from './Russia';
import '../css/Map.css';
import "polarmap";
import "proj4leaflet";
import "proj4";



// указываем путь к файлам marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const crs = new L.Proj.CRS("EPSG:3576","+proj=laea +lat_0=90 +lon_0=90 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
 {resolutions: [ 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5]
  //origin: [ -180, -90 ]         
}
);

class MapComponent extends React.Component {
  state = {
    lat: 70,
    lng: 80,
    zoom: 2,
    layer: 'cities'
  };

  onBMChange = (bm) => {
    // console.log(this);
    this.setState({
      layer: bm
    });
  }

  onGeojsonToggle = (e) => {
    
    this.setState({
      geojsonvisible: e.currentTarget.checked
    });
  }

  render() {
    var center = [this.state.lat, this.state.lng];
    var z = this.state.zoom;


    return (
      <Map zoom={z} center={center}  minZoom={2}  maxBounds={[[20, 50], [870, 2000]]} crs = {crs}>
      
     <GeojsonBase url="countries_arctic_2.json" />

     <GeojsonRussia url= "russia_new.geojson" />
     <GeojsonWater url="lakes_s.json" />
     <GeojsonWater url="rivers_s.json" />
     <GeojsonRoads url= "rus_roads_s.json" />


     <LayersControl position="topright">

     <LayersControl.Overlay name="Линии">
      <GeojsonLayer url="arctic_lines.geojson" />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Точки">
      <GeojsonLayer url="arctic_points.geojson"/>
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Плигоны">
      <GeojsonLayer url="arctic_poly.geojson" />
      </LayersControl.Overlay>
      </LayersControl>

      <ScaleControl position="bottomright" />

      </Map>
    );
  }
};

export default MapComponent;