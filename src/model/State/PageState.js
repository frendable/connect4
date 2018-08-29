import State from './State';

class PageState extends State {
  constructor(page) {
    super();
    this._page = page;
    console.log(`Open ${page}`);
  }

  GetPage() {
    return this._page;
  }
}

export default PageState;