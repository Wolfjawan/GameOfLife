import React, { Component } from 'react';

import '../App.css';

let grid = [];
// const this.state.gridLength = [];
let globalData = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: [],
      game: false,
      gridLength: [],
      timeInterval: 100,
      runing: false,
      matrix: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  enterNumber = () => {
    this.setState({ matrix: true });
    grid = [];
    this.maingame();
  };

  cells = (raw, col) => {
    let cell = document.getElementById(`${raw}-${col}`);
    if (cell === null) {
      return;
    }
    if (cell.style.backgroundColor === 'black') {
      return true;
    }
    return false;
  };

  //check cell if it's dead or live
  itSelf = (raw, col) => {
    return [this.cells(raw, col)];
  };

  //check cell neuboghrs if they are dead or live
  neuboghrs = (raw, col) => {
    return [
      this.cells(raw - 1, col - 1), //top left
      this.cells(raw - 1, col), //top center
      this.cells(raw - 1, col + 1), //top right
      this.cells(raw, col - 1), //middle left
      this.cells(raw, col + 1), //middle right
      this.cells(raw + 1, col - 1), //bottom left
      this.cells(raw + 1, col), //bottom center
      this.cells(raw + 1, col + 1), //bottom right
    ];
  };

  clickMe = (cell) => {
    if (cell.style.backgroundColor === 'black') {
      cell.style.backgroundColor = 'white';
    } else {
      cell.style.backgroundColor = 'black';
    }
  };
  gridCreation = (len) => {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        let div = document.createElement('div');
        div.id = `${i}-${j}`;
        div.className = 'cell';
        div.addEventListener('click', () => this.clickMe(div));
        div.innerHTML = `${i}${j}`;
        grid.push(div);
      }
      grid.push(document.createElement('br'));
    }
  };

  maingame = () => {
    let root = document.getElementById('cells');
    root.innerHTML = '';
    this.gridCreation(this.state.gridLength);
    grid.map((i) => {
      return root.appendChild(i);
    });
  };
  gameLogic = () => {
    const { gridLength } = this.state;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridLength; j++) {
        var currentCell = document.getElementById(`${i}-${j}`);
        var liveCells = this.neuboghrs(i, j).filter((index) => index === true);
        var ownCells = this.itSelf(i, j);
        let liveCell = liveCells.length;
        let data = [liveCell, currentCell, ownCells[0]];
        globalData.push({ data });
      }
    }
    this.gameCheck();
  };
  //Game Rules
  gameCheck = () => {
    globalData.forEach((data) => {
      if (data.data[2] && data.data[0] < 2) {
        data.data[1].style.background = 'white';
      }
      if (data.data[2] && data.data[0] > 3) {
        data.data[1].style.background = 'white';
      }
      if (data.data[2] && data.data[0] === 2) {
        data.data[1].style.background = 'black';
      }
      if (data.data[2] && data.data[0] === 3) {
        data.data[1].style.background = 'black';
      }
      if (!data.data[2] && data.data[0] === 3) {
        data.data[1].style.background = 'black';
      }
    });
  };
  // script start
  run = () => {
    this.setState({ runing: true });
    this.interval = setInterval(() => {
      this.gameLogic();
    }, this.state.timeInterval);
  };
  next = () => {
    this.gameLogic();
  };
  stop = () => {
    clearInterval(this.interval);
    grid = [];
    globalData = [];
    this.setState({ runing: false });
  };
  faster = () => {
    clearInterval(this.interval);
    const time = this.state.timeInterval - 100;
    this.setState({ timeInterval: time });
    this.run();
  };
  slower = () => {
    clearInterval(this.interval);
    const time = this.state.timeInterval + 100;
    this.setState({ timeInterval: time });
    this.run();
  };
  changeNumber = () => {
    this.setState({ matrix: false });
  };
  render() {
    return (
      <div className="game">
        <h1>Game Of Life</h1>
        <h3>Code Your Future</h3>
        <div id="cells" className="cells" />
        {!this.state.matrix ? (
          <div>
            <input
              name="gridLength"
              type="number"
              placeholder="Submit a number"
              value={this.state.gridLength}
              onChange={this.handleChange}
            />
            <button onClick={this.enterNumber}>submit</button>
          </div>
        ) : (
          <div>
            <button onClick={this.faster}>Faster</button>
            {!this.state.runing ? (
              <button onClick={this.run}>Start</button>
            ) : (
              <button onClick={this.stop}>stop</button>
            )}
            <button onClick={this.slower}>Slower</button>
            <button onClick={this.next}>next step</button>
            <button onClick={this.changeNumber}>Change matrix size</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
