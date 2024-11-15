import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import AppRouter from './app/navigation/AppRouter';
import store from './app/store/index';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
