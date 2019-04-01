import React, { Component } from 'react';
// import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: {
        rootDir: '',
        sep: '/'
      },
      dirs: [],
      files: [],
      cdI: -1,
      dirMenuVisible: true,
    };
  }

  componentDidMount() {
    Promise.resolve().then(() => {
      return fetch('/info');
    }).then((res) => {
      return res.json();
    }).then((info) => {
      this.setState({
        info: info,
      });
    }).catch((e) => {
      console.error(e.stack);
      alert(`Error: ${e.message}`);
    });

    Promise.resolve().then(() => {
      return fetch('/dir');
    }).then((res) => {
      return res.json();
    }).then((dirs) => {
      this.setState({
        dirs: dirs,
      });
    }).catch((e) => {
      console.error(e.stack);
      alert(`Error: ${e.message}`);
    })
  }

  opeDirMenu() {
    const { dirMenuVisible } = this.state;
    this.setState({
      dirMenuVisible: !dirMenuVisible
    });
  }

  loadFiles(i) {
    const { dirs } = this.state;
    const dir = dirs[i];
    Promise.resolve().then(() => {
      const params = new URLSearchParams();
      params.set('dir', dir);
      return fetch(`/file?${params.toString()}`);
    }).then((res) => {
      return res.json();
    }).then((files) => {
      return files.map((file) => {
        const { info } = this.state;
        const src = file.substr(info.rootDir.length).split(info.sep).reduce((part, name) => {
          return `${part}/${name}`;
        });
        const name = file.substr(dir.length + 1);
        return {
          path: file,
          src: src,
          name: name,
          selected: false,
          hidden: false,
        };
      });
    }).then((files) => {
      this.setState({
        files: files,
        cdI: i,
        dirMenuVisible: false,
      });
    }).catch((e) => {
      console.error(e.stack);
      alert(`Error: ${e.message}`);
    });
  }

  toggleSelected(i) {
    const { files } = this.state;
    const file = files[i];
    files[i].selected = !file.selected;
    this.setState({
      files: files,
    });
  }

  hideImages() {
    const { files } = this.state;
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.selected) {
        file.hidden = true;
        file.selected = false;
      }
    }
    this.setState({
      files: files
    });
  }

  showHiddenImages() {
    const { files } = this.state;
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      file.hidden = false;
    }
    this.setState({
      files: files,
    });
  }

  deleteImages() {
    const { files, cdI } = this.state;
    const targets = files.filter((file) => {
      return file.selected;
    }).map((file) => {
      return file.path;
    });
    if (targets.length === 0) {
      return;
    }

    const msg = targets.reduce((part, target) => {
      return `${part}\n${target}`
    }, `Delete? (${targets.length})`);
    const agreed = window.confirm(msg);
    if (!agreed) {
      return;
    }

    Promise.resolve().then(() => {
      return fetch('/file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          fpaths: targets
        }),
      });
    }).then((res) => {
      return res.json();
    }).then((result) => {
      // TODO
      alert('iii');
      console.log(result);

      this.loadFiles(cdI);
    }).catch((e) => {
      if (e instanceof Error) {
        console.error(e.stack);
        alert(`Error: ${e.message}`);
      } else {
        alert('kjkjfksj');
        console.log(e);
      }
    });
  }

  rename(i) {
    const { files, cdI } = this.state;
    const target = files[i];
    const newName = window.prompt(`Rename ${target.name} ->`, `${target.name}`);
    if (newName === undefined || newName === null || newName.length === 0) {
      return;
    }

    const isUnique = files.every((file) => {
      return file.name !== newName;
    });
    if (!isUnique) {
      alert(`Error: Same name.`);
      return;
    }

    Promise.resolve().then(() => {
      return fetch('/file', {
        method: 'PUT',
        body: JSON.stringify({
          path: target.path,
          name: newName
        }),
      });
    }).then((res) => {
      const json = res.json();
      if (json.message) {
        throw new Error(json.message);
      } else {
        return json;
      }
    }).then(() => {
      this.loadFiles(cdI);
    }).catch((e) => {
      console.error(e.stack);
      alert(`Error: ${e.message}`);
    });
  }

  render() {
    const { info, dirs, files, dirMenuVisible, cdI } = this.state;
    return (
      <div>

        <h1>{info.rootDir}</h1>

        <div id='dir_menu' className={dirMenuVisible ? 'positive' : 'negative'}>
          <div>
            <button onClick={() => this.opeDirMenu()}>{dirMenuVisible ? 'Hide' : 'Show'}</button>
            <span>{0 <= cdI ? `(${files.length})` : ''}</span>
            <span>{0 <= cdI ? dirs[cdI] : ''}</span>
          </div>
          <ul className={dirMenuVisible ? '' : 'hidden'}>
            {dirs.map((dir, i) => (
            <li
              key={dir}
              className={cdI === i ? 'selected' : ''}
              onClick={() => this.loadFiles(i)}
            >
              {dir}
            </li>
            ))}
          </ul>
        </div>

        <div id='image_operator'>
          <div>
            <button onClick={() => this.hideImages()}>Hide</button>
            <button onClick={() => this.showHiddenImages()}>Show</button>
            <button onClick={() => this.deleteImages()}>Delete</button>
          </div>
          <div>
            {files.map((file, i) => (
            <div key={file} className={file.hidden ? 'hidden' : ''}>
              <div>
                <img
                  src={file.src}
                  alt={file.path}
                  onClick={() => this.toggleSelected(i)}
                  className={file.selected ? 'selected' : ''}
                />
              </div>
              <div>
                <span>{file.name}</span>
                <button onClick={() => this.rename(i)}>Rename</button>
              </div>
            </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

}

export default App;
