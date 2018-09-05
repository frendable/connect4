import { PAGE } from '../../resource/GameConstant';
import PageState from './PageState';

/**
 * Page state transition for in game page
 */
class InGamePageState extends PageState {
  constructor() {
    super(PAGE.IN_GAME);
  }

  doAction(context) {
    context.setPageState(this);
  }
}

export default InGamePageState;