import State from './State';

class TurnState extends State {
  constructor(color, playerType) {
    super();
    this._color = color;
    this._playerType = playerType;
    console.log(`${this._color} Player Turn ${this._playerType}`);
  }

  getColor() {
    return this._color;
  }

  getPlayerType() {
    return this._playerType;
  }
}

export default TurnState;