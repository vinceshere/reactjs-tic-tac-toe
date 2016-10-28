import React, { Component } from 'react';
import './App.css';

const original = {
  PLAYER_ONE_SYMBOL: "X",
  PLAYER_TWO_SYMBOL: "O",
  currentTurn: "X",
  message: "Player 1 turn (X)",
  winner: "",
  board: [
    "", "", "", "", "", "", "", "", ""
  ]
};

class App extends Component {

  constructor(props) {
    super(props)

    this.state = original;
  }

  handleClick(index) {

    if(this.state.board[index] || this.state.winner){
      return
    }

    let boardCopy = this.state.board;

    boardCopy[index] = this.state.currentTurn
    this.setState({
      board: boardCopy,
      currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL
    })
    this.turnMessage();
    this.checkWinning();
  }

  checkWinning() {
    let winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for(var i = 0; i < winningCombos.length; i++){
      if(this.state.board[winningCombos[i][0]] && this.state.board[winningCombos[i][1]] && this.state.board[winningCombos[i][2]] && this.state.board[winningCombos[i][0]] === this.state.board[winningCombos[i][1]]
        && this.state.board[winningCombos[i][1]] === this.state.board[winningCombos[i][2]] ){

        if(this.state.board[winningCombos[i][0]] === "X"){
          this.setState({
            message: "Player 1 won!",
            winner: "won"
          });

          return;
        }

        if(this.state.board[winningCombos[i][0]] === "O"){
          this.setState({
            message: "Player 2 won!",
            winner: "won"
          });

          return;
        }

      }else if(this.state.board[0] && this.state.board[1] && this.state.board[2] && this.state.board[3] && this.state.board[4] && this.state.board[5] && this.state.board[6] && this.state.board[7] && this.state.board[8] && (!this.state.winner)){
        this.setState({
          message: "Draw!"
        });
      }
    }

  }

  turnMessage(){
    if(this.state.currentTurn === "O"){
      this.setState({
        message: "Player 1 turn (X)"
      });
    }
    if(this.state.currentTurn === "X"){
      this.setState({
        message: "Player 2 turn (O)"
      });
    }
  }

  reset(){
    this.setState({
      currentTurn: "X",
      message: "Player 1 turn",
      winner: "",
      board: [
        "", "", "", "", "", "", "", "", ""
      ]
    });
  }

  render() {
    return (
      <div>
        <div className="turn">
          <p className={this.props.winner}>{this.state.message}</p>
        </div>
        <div className="board">
          {this.state.board.map((cell, index) => {
            return <div key={index} onClick={() => this.handleClick(index)} className="square">{cell}</div>;
          })}
        </div>
        <button onClick={this.reset.bind(this)}>Reset</button>
      </div>
    )
  }
}

export default App;
