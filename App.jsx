/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/navigation/navigation';
import {AppContextProvider} from './src/context';

const App = () => {
  return (
    <AppContextProvider>
      <Navigation />
    </AppContextProvider>
  );
};

export default App;
