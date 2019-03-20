import React from 'react';

class RootDirInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootDir: '',
      sep: '/'
    };
  }

  componentDidMount() {
    Promise.resolve().then(() =>
      fetch('/info')
    ).then(res =>
      res.json()
    ).then((info) => {
      this.setState({
        rootDir: info.rootDir,
        sep: info.sep
      });
    }).catch((e) => {
      console.log(e);
      alert('error');
    });
  }

  render() {
    const { rootDir } = this.state;
    return (
      <h1>{rootDir}</h1>
    );
  }
}

export default RootDirInfo;
