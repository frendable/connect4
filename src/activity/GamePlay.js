import Context from '../model/State/Context';
import Interface from '../util/Interface';
import MainMenuPageState from '../model/State/MainMenuPageState';
import { PAGE } from '../resource/GameConstant';

import MainMenuController from '../controller/MainMenu';
import InGameController from '../controller/InGame';

let FRAME = 100;

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
    mainMenuPageState.DoAction(this._context);
  }

  activityManager() {
    if (this._context.GetPageState().GetPage() === PAGE.MAIN_MENU) {
      this._activeController = this._mainMenuController;
      this._activeController.Render(() => {
        this.loop();
      });
    } else {
      if (this._inGameController === null) {
        this._inGameController = new InGameController(this._context, this._ui);
      }
      this._activeController = this._inGameController;
      this._activeController.Render();
      this.loop();
    }
  }

  loop() {
    setTimeout(() => {
      this.activityManager();
    }, FRAME);
  }

  start() {
    console.log('Game started!');
    this.loop();
  }
}

export default GamePlay;