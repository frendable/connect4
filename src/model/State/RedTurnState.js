import { COLOR } from '../../resource/GameConstant';
import TurnState from './TurnState';

/**
 * Red player turn state
 */
class RedTurnState extends TurnState {
  constructor(playerType) {
    super(COLOR.RED, playerType);
  }

  doAction(context) {
    /**
     * Red player make a move
     */
    context.setTurnState(this);
  }
}

export default RedTurnState;