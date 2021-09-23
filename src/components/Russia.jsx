import React from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';
import "../css/GeojsonLayer.css"

export default class GeojsonRussia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    console.log('contructor');
  }

  myStyle = () => {
    return {
      color: "#E3DFDA",
      weight: 1,
      opacity: 1, 
      fillColor: "#d5d2cd", 
      fillOpacity: 1
    }
  }

  render() {
    console.log('render');

    console.info(this.state.data);
    return (
      <FeatureGroup>
        {this.state.data.map(f => {
          return <GeoJSON key={f.properties.id} data={f} style={this.myStyle}>
             <Popup>{f.properties.NAME}</Popup>
          </GeoJSON>
        })}
      </FeatureGroup>
    );
  }

  componentDidMount() {
    if (this.props.url) {
      this.fetchData(this.props.url);
    }
    console.log('did mount');
  }

  componentWillUnmount() {
    console.log('will unmount');

  }

  fetchData(url) {
    let request = fetch(url);

    request
      .then(r => r.json())
      .then(data => {
        this.setState({
          data: data.features
        });
      }, (error) => {
        console.error(error);
      });
  }
}