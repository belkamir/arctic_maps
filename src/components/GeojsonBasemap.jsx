import React from 'react';
import { GeoJSON, FeatureGroup, Popup} from 'react-leaflet';
import "../css/GeojsonLayer.css"

export default class GeojsonBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    console.log('contructor');
  }

  myStyle = () => {
    return {
      color: "#b3b2b1",
      weight: 0.8,
      Opacity: 1,
      fillColor: "#CED2D6",
      fillOpacity: 1
      //dashArray: '5 5'
    }
  }

  render() {
    console.log('render');

    console.info(this.state.data);
    return (
      <FeatureGroup>
        {this.state.data.map(f => {
          return <GeoJSON key={f.properties.id} data={f} style={this.myStyle}>
             <Popup>{f.properties.name}</Popup>
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