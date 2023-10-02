import { Main } from "./Main.tsx";
import { CookiesProvider } from "react-cookie";
import { Provider } from 'react-redux';
import { store } from './redux/store.tsx';
import React from "react";

function App() {
  return (
    <CookiesProvider>
    <div className="bg-[#EFFAFA]">
    <Provider store={store}>
      <Main />
      </Provider>
    </div>
    </CookiesProvider>
    
  );
}

export default App;
