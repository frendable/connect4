import State from './State';

class TurnState extends State {
  constructor(color, playerType) {
    super();
    this._color = color;
    this._playerType = playerType;
    console.log(`${this._color} Player Turn ${this._playerType}`);
  }

  GetColor() {
    return this._color;
  }

  GetPlayerType() {
    return this._playerType;
  }
}

export default TurnState;