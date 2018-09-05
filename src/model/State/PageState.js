import State from './State';

/**
 * Parent class page state handling
 */
class PageState extends State {
  constructor(page) {
    super();
    this._page = page;
  }

  getPage() {
    return this._page;
  }
}

export default PageState;