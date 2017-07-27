import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const stages = [{matches:[{
  players: ["👻 Darren", "🤖 Manuel"]
},{
  players: ["💩 Dmitry", "🎃 Smith"]
}]}]


class Match extends Component {
  constructor(props){
    super(props);
    this.state = {
      score: [0, 0],
      currentlyPlaying: true
    }
  }
  change(index) {
    return (event) => {
      let scores = this.state.score;
      scores[index] = event.target.value;
      let currentlyPlaying = true;
      if (scores[index] >= 10) {
        currentlyPlaying = false;
        this.props.setWinner(index);
      }
      this.setState({ score: scores, currentlyPlaying })
    }
  }
  render() {
    return (
      <div>
        {this.props.match.players.map((player, index) => <Player player={player} score={this.state.score[index]} currentlyPlaying={this.state.currentlyPlaying} onChange={this.change(index)}/>)}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: stages
    }
  }

  addWinner(index) {
    return (winner) => {
      if(!this.state.stages[index + 1]) {
        this.state.stages.push({
            matches:[{
              players: [winner]
            }]
        });
        this.setState({
          stages: this.state.stages
        })
      }else {
        this.state.stages[1].matches[0].players.push([winner])
        this.setState({
          stages: this.state.stages
        })
      }
    }
  }

  render() {
    return (
      <div className="App"  style={{
        display: "flex",
        flexDirection: "row"
      }}>
        {stages.map((stage, index) => <Stage matches={stage.matches} addWinner={this.addWinner(index)}/>)}
      </div>
    );
  }
}

class Player extends Component {
  onChange(event){
    stages[0].matches[0].score = [10, 10]
  }
  render() {
    return (
      <div style={{
        color: "#fff",
        backgroundColor: "#00c1ad",
        minWidth: "200px",
        margin: "10px",
        padding: "10px"
      }}>
        {this.props.player} &nbsp;&nbsp;
        {<input disabled={!this.props.currentlyPlaying} value={this.props.score} type="number" onChange={this.props.onChange} />}
      </div>
    );
  }
}

class Stage extends Component {
  constructure (props) {
    // super()
  }

  winner(index) {
    return (winnerIndex) => {
      this.props.addWinner(this.props.matches[index].players[winnerIndex])
    }
  }

  render() {
    return (
      <div>
        {this.props.matches.map((match, index) => <Match match={match} setWinner={this.winner(index)}/>)}
      </div>
    );
  }
}


export default App;
