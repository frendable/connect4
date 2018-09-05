import { PAGE } from '../../resource/GameConstant';
import PageState from './PageState';

/**
 * Page state transition for main menu
 */
class MainMenuPageState extends PageState {
  constructor() {
    super(PAGE.MAIN_MENU);
  }

  doAction(context) {
    context.setPageState(this);
  }
}

export default MainMenuPageState;