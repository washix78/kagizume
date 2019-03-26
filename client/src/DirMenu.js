import React, { Component } from 'react';

class DirMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      dirs: []
    };
  }

  componentDidMount() {
    Promise.resolve().then(
      () => fetch('/dir')
    ).then(
      res => res.json()
    ).then((dirs) => {
      this.setState({
        dirs: dirs,
        visible: true
      });
    }).catch((e) => {
      alert(`Error: ${e.message}`);
      console.log(e.stack);
    });
  }

  operate() {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    });
  }

  clickDirItem(dir) {
    Promise.resolve()
    .then(() => {
      const params = new URLSearchParams();
      params.set('dir', dir);
      return fetch(`/file?${params.toString()}`);
    })
    .then(res => res.json())
    .then(files => {

    }).catch(e => {
      alert(`Error: ${e.message}`);
      console.log(e.stack);
    });
  }

  render() {
    const { visible, dirs } = this.state;
    return (
      <div>
        <button
          className={visible ? 'negative' : 'positive'}
          onClick={() => this.operate()}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
        <ul className={'positive ' + (visible ? '' : 'hidden')}>
        {dirs.map(dir => (
          <li key={dir} onClick={() => { this.props.handleClick(dir) }}>{dir}</li>
        ))}
        </ul>
      </div>
    );
  }

}

export default DirMenu;
