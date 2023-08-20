import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fen: 'start',
    };
    this.game = new Chess();
  }

  handleAIMove = () => {
    const moves = this.game.moves();
    const randomIndex = Math.floor(Math.random() * moves.length);
    this.game.move(moves[randomIndex]);
  
    this.setState({ fen: this.game.fen() });
  };
  
  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Default promotion to queen
    });

    if (move === null) return;

    this.setState({ fen: this.game.fen() });

    setTimeout(() => {
      this.handleAIMove();
    }, 300); // Delay AI move for better visualization
  };

  render() {
    return (
      <div className="App">
        <h1 className='title'>React Chess</h1>
        <Chessboard position={this.state.fen} onDrop={this.onDrop} />
      </div>
    );
  }
}

export default App;