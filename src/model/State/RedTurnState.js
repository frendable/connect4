import { COLOR } from '../../resource/GameConstant';
import TurnState from './TurnState';

class RedTurnState extends TurnState {
  constructor(playerType) {
    super(COLOR.RED, playerType);
  }

  DoAction(context) {
    console.log(`Red Player Make A move!`);
    context.SetTurnState(this);
  }
}

export default RedTurnState;