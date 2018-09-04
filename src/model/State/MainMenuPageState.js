import { PAGE } from '../../resource/GameConstant';
import PageState from './PageState';

class MainMenuPageState extends PageState {
  constructor() {
    super(PAGE.MAIN_MENU);
  }

  doAction(context) {
    console.log(`Main Menu!`);
    context.setPageState(this);
  }
}

export default MainMenuPageState;