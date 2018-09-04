import { COLOR } from '../resource/GameConstant';

class Disc {
  constructor(color = COLOR.WHITE) {
    this._emptyShape = '○';
    this._fullShape = '•';
    this._color = color;
  }

  set color(color) {
    this._color = color;
  }
  
  get color() {
    return this._color;
  }

  getHexColor() {
    return Disc.getHexColorWithParam(this._color);
  }

  getShape() {
    return (this._color === COLOR.BLUE || this._color === COLOR.RED) ? this._fullShape : this._emptyShape; 
  }

  static getHexColorWithParam(color) {
    let hexColor;
    switch(color) {
      case COLOR.BLUE:
        hexColor = '#0000FF';
        break;
      case COLOR.RED:
        hexColor = '#FF0000';
        break;
      default: hexColor = '#000000';
    }
    return hexColor;
  }
}

export default Disc;