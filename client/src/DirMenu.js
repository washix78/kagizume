import React from 'react';

class DirMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      dirs: []
    };
  }

  componentDidMount() {
    Promise.resolve().then(() =>
      fetch('/dir')
    ).then(res =>
      res.json()
    ).then((dirs) => {
      this.setState({
        dirs: dirs,
        visible: true
      });
    }).catch((e) => {
      console.log(e);
      alert('error');
    });
  }

  operate() {
    const { visible } = this.state;
    this.setState({
      visible: !visible
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
          <li key={dir}>{dir}</li>
        ))}
        </ul>
      </div>
    );
  }

}

export default DirMenu;
