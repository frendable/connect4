import Player from './Player';
import Move from './Move';
import { COLOR } from '../../resource/GameConstant';
import Disc from '../Disc';

/**
 * Computer player (AI)
 */
class Computer extends Player {
  constructor(gameBoard) {
    super('Computer');
    this._gameBoard = gameBoard;
  }

  /**
   * Set difficulty of playing with ai
   * @param {int} depth maximum depth ai search for best move 
   */
  setDifficulty(depth) {
    this._depth = depth;
  }

  /**
   * Get column for ai move
   * @return column
   */
  getColumn(player, opponent) {
    return this.selectMove(player, opponent, -10000, 10000, this._depth).getColumn();
  }

  /**
   * Recursive minmax method
   * @param {COLOR} player player will move
   * @param {COLOR} opponent player won't move
   * @param {int} alpha the best score ai player achieve
   * @param {int} beta the best score other player achieve
   * @param {int} depth current depth in tree
   * @return bestMove
   */
  selectMove(player, opponent, alpha, beta, depth) {
    let bestMove = new Move(-1, player === COLOR.RED ? alpha : beta);
    for (let i = 0; i < this._gameBoard.getNumColumn(); i++) {
      if (this._gameBoard.columnHeight(i) > 0) {
        this._gameBoard.placeMove(i, new Disc(player));
        let score = 0;
        if (this._gameBoard.checkMatch(i, this._gameBoard.columnHeight(i))) {
          score = player === COLOR.RED ? 1 : -1;
        } else if (depth !== 1) {
          score = this.selectMove(opponent, player, alpha, beta, depth - 1).getScore();
        }

        this._gameBoard.undoMove(i);
        
        if (player === COLOR.RED && score > bestMove.getScore()) {
          bestMove = new Move(i, score);
          alpha = score;
        } else if (player === COLOR.BLUE && score < bestMove.getScore()) {
          bestMove = new Move(i, score);
          beta = score;
        }

        if (alpha >= beta) {
          return bestMove;
        }
      }
    }
    return bestMove;
  }
}

export default Computer;