'use strict';

var _GamePlay = require('./activity/GamePlay');

var _GamePlay2 = _interopRequireDefault(_GamePlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Program starting point
 */
var Connect4 = function Connect4() {
  _classCallCheck(this, Connect4);

  var gamePlay = new _GamePlay2.default();
  console.log('Game play created!');
  gamePlay.start();
};

new Connect4();
