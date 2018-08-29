import State from "./State";
import { DIFFICULTY, PLAYER_TYPE } from '../../resource/GameConstant';

class MenuState extends State {
  constructor() {
    super();
    this._difficulty = DIFFICULTY.EASY;
    this._playerBlue = PLAYER_TYPE.HUMAN;
    this._playerRed = PLAYER_TYPE.COMPUTER;
  }

  SetDifficulty(difficulty) {
    this._difficulty = difficulty;
  }

  SetPlayerBlue(playerType) {
    this._playerBlue = playerType;
  }

  SetPlayerRed(playerType) {
    this._playerRed = playerType;
  }

  DoAction(context) {
    context.SetMenuState(this);
  }
}

export default MenuState;