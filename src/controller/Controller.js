/**
 * Parent controller component
 */
class Controller {
  constructor(context, ui) {
    this.context = context;
    this.ui = ui;
  }

  /**
   * @param {function} switchCallback to switch between page
   */
  start(switchCallback) {}
}

export default Controller;