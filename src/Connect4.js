import GamePlay from './activity/GamePlay';

/**
 * Program starting point
 */
class Connect4 {
  constructor() {
    const gamePlay = new GamePlay();
    gamePlay.start();
  }
}

export default Connect4;

new Connect4();