/**
 * Used for calculating move score and compare them to get the best move for AI player
 */
class Move {
  constructor(column, score) {
    this._column = column;
    this._score = score;
  }

  getColumn() {
    return this._column;
  }

  getScore() {
    return this._score;
  }
}

export default Move;