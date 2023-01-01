import { TActionPayload } from "@framework/types";

export class StoreProvider {
  store: any

  constructor(initialState: any) {
    this.store = initialState;

    // return { dispatch: this.dispatch, store: this.store, render: this.render }
  }

  dispatch(action: TActionPayload) {
    switch (action.type) {
      case 'SET_USERS':
        this.store.user = ['user1', 'user2'];
        break;

      default:
        break;
    }
    this.render();
  }

  render() { }
}