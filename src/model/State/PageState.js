import State from './State';

class PageState extends State {
  constructor(page) {
    super();
    this._page = page;
    console.log(`Open ${page}`);
  }

  getPage() {
    return this._page;
  }
}

export default PageState;