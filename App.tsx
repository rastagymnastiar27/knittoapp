import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import AppRouter from './app/navigation/AppRouter'; // Pastikan menggunakan router aplikasi yang sudah kamu buat
import store from './app/store'; // Import store yang telah kamu buat

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
