import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store, persistor } from './store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { GoogleMapsProvider } from './context/GoogleMapContext.jsx';
// import { SocketProvider } from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <BrowserRouter>
       <GoogleMapsProvider>
       {/* <SocketProvider>     */}
   <Routes>
   
    <Route path="*" element={<App/>}/>
   </Routes>
   {/* </SocketProvider> */}
   </GoogleMapsProvider>
   </BrowserRouter>
   </PersistGate>
   </Provider>

)
