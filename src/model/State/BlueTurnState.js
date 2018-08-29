import { COLOR } from '../../resource/GameConstant';
import TurnState from './TurnState';

class BlueTurnState extends TurnState {
  constructor(playerType) {
    super(COLOR.BLUE, playerType);
  }

  DoAction(context) {
    console.log(`Blue Player Make A move!`);
    context.SetTurnState(this);
  }
}

export default BlueTurnState;