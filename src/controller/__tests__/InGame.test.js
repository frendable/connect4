// import jest from 'jest';
import Context from '../../model/State/Context';
import Interface from '../../util/Interface';
import GameState from '../../model/State/GameState';
import { OUTCOME, PLAYER_TYPE } from '../../resource/GameConstant'
import InGame from '../InGame';

test('Test human vs computer red player win', () => {
  const context = new Context();
  const gameState = new GameState();
  gameState.doAction(context);
  const inGame = new InGame(context, new Interface());
  inGame.start();
  inGame.dropDisc(1);
  inGame.dropDisc(1);
  inGame.dropDisc(2);
  inGame.dropDisc(1);

  /**
   * Red player win
   */
  expect(inGame.getGameBoard().checkWin()).toEqual(OUTCOME.RED_WIN);
});

test('Test computer vs computer', () => {
  const context = new Context();
  const gameState = new GameState();
  gameState.setPlayerBlue(PLAYER_TYPE.COMPUTER);
  gameState.setPlayerRed(PLAYER_TYPE.COMPUTER);
  gameState.doAction(context);
  const inGame = new InGame(context, new Interface());
  inGame.start();

  /**
   * Red player win
   */
  expect(inGame.getGameBoard().checkWin()).toEqual(OUTCOME.RED_WIN);
})