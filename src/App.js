import React from 'react';
import { Provider } from 'react-redux';

import store from './reducers/store/store';
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <Provider store={store}>

             <AppNavigation />


    </Provider>
  );
};

export default App;