import MainMenuView from '../view/MainMenu';
import Controller from './Controller';

class MainMenu extends Controller {
  constructor(context, ui) {
    super(context, ui);
    //Init view
    this._mainMenuView = new MainMenuView(context, ui);
  }

  start(callback) {
    this._mainMenuView.renderQuestion(callback);
  }
 }

export default MainMenu;