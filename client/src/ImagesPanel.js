import React from 'react';

class ImagesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locals: [],
      srcs: []
    };
  }

  render() {
    const { files } = this.state;
    return (
      <div>
      {files.map(file => (
        <li key={file}></li>
      ))}
      </div>
    );
  }

}
