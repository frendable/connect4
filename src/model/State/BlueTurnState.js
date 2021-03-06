import { COLOR } from '../../resource/GameConstant';
import TurnState from './TurnState';

/**
 * Blue player turn state
 */
class BlueTurnState extends TurnState {
  constructor(playerType) {
    super(COLOR.BLUE, playerType);
  }

  doAction(context) {
    /**
     * Blue player make a move
     */
    context.setTurnState(this);
  }
}

export default BlueTurnState;