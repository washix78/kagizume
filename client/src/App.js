import React, { Component } from 'react';
// import './App.css';
import Information from './Information';
import DirMenu from './DirMenu';
import ImageList from './ImageList';

class App extends Component {

  constructor(props) {
    super(props);
    this.rootDirInfo = React.createRef();
    this.imageList = React.createRef();
    this.state = {
      files: [],
    };
    this.changeCurrentDir = this.changeCurrentDir.bind(this);
  }

  changeCurrentDir(dir) {
    Promise.resolve().then(() => {
      const params = new URLSearchParams();
      params.set('dir', dir);
      return fetch(`/file?${params.toString()}`);
    }).then(res => res.json()).then((files) => {
      this.rootDirInfo.current.changeCurrentDir(dir);
      var sep = this.rootDirInfo.current.state.sep;
      var rootDir = this.rootDirInfo.current.state.rootDir;
      var urls = files.map((file) => {
        return file.substr(rootDir.length + 1).replace(sep, '/');
      });
      // this.images.current.update(files, urls);

      // const { info } = this.state;
      // this.setState({
      //   files: files.map((path) => {
      //     return '/' + path.substr(info.rootDir.length + 1).replace(info.sep, '/');
      //   }),
      //   isMenuVisible: false
      // });
    }).catch((e) => {
      console.log(e);
      alert(e);
    });
  }

  render() {
    return (
      <div>
        <Information ref={this.rootDirInfo} />
        <DirMenu handleClick={this.changeCurrentDir}/>
        <ImageList ref={this.imageList} />
      </div>
    );
  }

}

export default App;
