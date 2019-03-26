import React, { Component } from 'react';

class Information extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rootDir: '',
      sep: '/'
    };
  }

  componentDidMount() {
    Promise.resolve().then(
      () => fetch('/info')
    ).then(
      res => res.json()
    ).then((info) => {
      this.setState({
        rootDir: info.rootDir,
        sep: info.sep
      });
    }).catch((e) => {
      alert(`Error: ${e.message}`);
      console.log(e.stack);
    });
  }

  render() {
    const { rootDir } = this.state;
    return (
      <div>
        <h1>{rootDir}</h1>
      </div>
    );
  }
}

export default Information;
