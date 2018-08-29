import GamePlay from './activity/GamePlay';

/**
 * Program starting point
 */
class Connect4 {
  constructor() {
    const gamePlay = new GamePlay();
    console.log('Game play created!');
    gamePlay.start();
  }
}

new Connect4();