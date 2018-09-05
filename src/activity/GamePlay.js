import Context from '../model/State/Context';
import Interface from '../util/Interface';
import MainMenuPageState from '../model/State/MainMenuPageState';
import { PAGE } from '../resource/GameConstant';

import MainMenuController from '../controller/MainMenu';
import InGameController from '../controller/InGame';

/**
 * Page management handling
 */
class GamePlay {
  constructor() {
    this._context = new Context();
    this._ui = new Interface();
    this._mainMenuController = new MainMenuController(this._context, this._ui);
    this._inGameController = null;
    this._activeController = this._mainMenuController;

    /**
     * Open main menu page for the first time
     */
    const mainMenuPageState = new MainMenuPageState();
    mainMenuPageState.doAction(this._context);
  }

  /**
   * Handle page switching
   */
  activityManager() {
    if (this._context.getPageState().getPage() === PAGE.MAIN_MENU) {
      this._activeController = this._mainMenuController;
      this._activeController.start(() => {
        this.activityManager();
      });
    } else {
      if (this._inGameController === null) {
        this._inGameController = new InGameController(this._context, this._ui);
      }
      this._activeController = this._inGameController;
      this._activeController.start(() => {
        this.activityManager();
      });
    }
  }

  start() {
    this.activityManager();
  }
}

export default GamePlay;