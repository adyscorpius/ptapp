/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import configureStore from "./configureStore";
let { store, persistor } = configureStore();

import MainComponent from "./MainComponent";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;
