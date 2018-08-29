import { PAGE } from '../../resource/GameConstant';
import PageState from './PageState';

class MainMenuPageState extends PageState {
  constructor() {
    super(PAGE.MAIN_MENU);
  }

  DoAction(context) {
    console.log(`Main Menu!`);
    context.SetPageState(this);
  }
}

export default MainMenuPageState;