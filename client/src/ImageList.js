import React, { Component } from 'react';
import ImageItem from './ImageItem';

class ImageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      urls: [],
      selected: Array(0).fill(false),
      hidden: Array(0).fill(false),
    };
    this.hide = this.hide.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  update(files, urls) {
    this.setState({
      files: files,
      urls: urls,
      selected: Array(files.length).fill(false),
      hidden: Array(files.length).fill(false),
    });
  }

  select(i) {
    const { selected } = this.state;
    selected[i] = !selected[i];
    this.setState({
      selected: selected
    });
  }

  hide() {
    const { selected, hidden } = this.state;
    for (var i = 0; i < selected.length; i++) {
      if (selected[i]) {
        hidden[i] = true;
        selected[i] = false;
      }
    }
    this.setState({
      hidden: hidden,
      selected: selected
    });
  }

  showAll() {
    const { selected, hidden } = this.state;


  }

  render() {
    const { files, urls, selected, hidden } = this.state;
    return (
      <div>
        <p>
          <span>{files.length}</span>
          <button className='negative' onClick={this.hide}>hide</button>
          <button className='positive' onClick={this.showAll}>Show all</button>
        </p>
        <div>
        {files.map((file, i) => (
          <ImageItem />
        ))}
        </div>

      </div>
    );
  }
}

export default ImageList;
