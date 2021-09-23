import React from 'react';

class ChLayer extends React.Component {
  
  onChange = (e) => {
    var bm = e.currentTarget.value;
    if (this.props.onChange) {
      this.props.onChange(bm);
    }
  }

  
  render() {
    return (
      <div className="basemaps-container">
        <select value={this.props.layer} onChange={this.onChange}>
          <option value="cities">CITIES</option>
          <option value="regions">REGIONS</option>
          <option value="permafrost">PERMAFROST</option>
        </select>
      </div>
    );
  }
};

export default ChLayer;