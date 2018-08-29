import MainMenuView from '../view/MainMenu';

class MainMenu {
  constructor(context, ui) {
    //Init view
    this._mainMenuView = new MainMenuView(context, ui);
  }

  Render(callback) {
    this._mainMenuView.RenderQuestion(callback);
  }
 }

export default MainMenu;