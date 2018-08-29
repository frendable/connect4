import { PAGE } from '../../resource/GameConstant';
import PageState from './PageState';

class InGamePageState extends PageState {
  constructor() {
    super(PAGE.IN_GAME);
  }

  DoAction(context) {
    console.log(`In Game!`);
    context.SetPageState(this);
  }
}

export default InGamePageState;