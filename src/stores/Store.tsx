import _ from 'lodash';
import React, { Component, useContext } from 'react';

const initialData = {};

var Store = React.createContext(initialData);

// Expose the Store to the Global scope for easy Store inspection from the console (Store.get())
globalThis.Store = Store;

// const UseStore = (name = false) => (name ? useContext(Store)[name] : useContext(Store));

const UseStore = (name = '') => (name !== '' ?  useContext(Store)[name] :  useContext(Store));

const withStore = (ReactComponent, name) => (props) => (
  <Store.Consumer>{(context) => <ReactComponent {...context[name]} {...props} />}</Store.Consumer>
);

const createStore = function(name = 'global', data) {
  initialData[name] = data;

  return {
    set: (data, callback) => {
      Store.set(  // @todo Property 'set' does not 1 van xist on type 'Context<{}>'.
        {
          [name]: data,
        },
        callback
      );
    },

    get: () => {
      return Store.get(name);
    },

    use: () => UseStore(name),

    with: (ReactComponent) => withStore(ReactComponent, name),
  };
};

interface MyProps {
}

interface MyState {
  store: {}
}

class StoreProvider extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    // Set the initialGlobals
    this.state = {
      store: initialData,
    };
  }

  componentDidMount() {
    Store.set = this.setStore;
    Store.get = this.getStore;
  }

  setStore = (data, callback = () => null) => {
    const { store = {} } = this.state;

    // Update the state with the new State
    this.setState(
      {
        store: _.merge(store, data),
      },
      callback
    );
  };

  getStore = (name = "") => {
    return name ? this.state.store[name] : this.state.store;
  };

  render() {
    const { App = () => null } = this.props;

    return (
      // Pass the current value of the Store, based on the State, down
      <Store.Provider value={this.state.store}>
        <App />
      </Store.Provider>
    );
  }
}

export { StoreProvider, Store, createStore, UseStore, withStore };
