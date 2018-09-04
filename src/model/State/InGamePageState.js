import { PAGE } from '../../resource/GameConstant';
import PageState from './PageState';

class InGamePageState extends PageState {
  constructor() {
    super(PAGE.IN_GAME);
  }

  doAction(context) {
    console.log(`In Game!`);
    context.setPageState(this);
  }
}

export default InGamePageState;