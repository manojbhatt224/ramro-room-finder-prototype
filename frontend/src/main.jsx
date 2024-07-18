import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store.js';
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
       <BrowserRouter>
   <Routes>
    <Route path="*" element={<App/>}/>
   </Routes>
   </BrowserRouter>
   </Provider>

)
