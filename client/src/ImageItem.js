import React, { Component } from 'react';

class ImageItem extends Component {

  constructor(props) {
    console.log(props);
    alert(props);
    super(props);
    this.state = {
      src: '',
      alt: ''
    };
  }

  render() {
    const { src, alt } = this.state;
    return (
      <div className='image'>
        <img src={src} alt={alt} />
      </div>
    );
  }

}

export default ImageItem;
