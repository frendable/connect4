import State from "./State";
import { DIFFICULTY, PLAYER_TYPE, OUTCOME } from '../../resource/GameConstant';

/**
 * Define all properties related to gamestate
 */
class GameState extends State {
  constructor() {
    super();
    this._difficulty = DIFFICULTY.EASY;
    this._playerBlue = PLAYER_TYPE.HUMAN;
    this._playerRed = PLAYER_TYPE.COMPUTER;
    this._outcome = OUTCOME.NOTHING;
  }

  setDifficulty(difficulty) {
    this._difficulty = difficulty;
  }

  getDifficulty() {
    return this._difficulty;
  }

  setPlayerBlue(playerType) {
    this._playerBlue = playerType;
  }

  getPlayerBlue() {
    return this._playerBlue;
  }

  setPlayerRed(playerType) {
    this._playerRed = playerType;
  }

  getPlayerRed() {
    return this._playerRed;
  }

  setOutcome(outcome) {
    this._outcome = outcome;
  }

  getOutcome() {
    return this._outcome;
  }

  doAction(context) {
    context.setGameState(this);
  }
}

export default GameState;