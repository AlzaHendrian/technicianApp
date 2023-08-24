import React, {createContext, useContext, useReducer} from 'react';
import {initialState} from './state';
import {reducer} from './reducer';

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => useContext(AppContext);
