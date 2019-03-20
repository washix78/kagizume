import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import RootDirInfo from './RootDirInfo';
import DirMenu from './DirMenu';
import { getCiphers } from 'tls';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  clickFpath(dir) {
    Promise.resolve().then(() => {
      const params = new URLSearchParams();
      params.set('dir', dir);
      return fetch(`/file?${params.toString()}`)
    }).then(res => res.json()).then((files) => {
      console.log(files);
      const { info } = this.state;
      this.setState({
        files: files.map((path) => {
          return '/' + path.substr(info.rootDir.length + 1).replace(info.sep, '/');
        }),
        isMenuVisible: false
      });
    }).catch((e) => {
      console.log(e);
      alert(e);
    });
  }

  render() {
    const { files } = this.state;
    return (
      <div>
        <RootDirInfo />
        <DirMenu />
        <div>
          {files.map(file => (
            <img key={file} src={file} alt="not file"/>
          ))}
        </div>
      </div>
    );
  }

}

export default App;
