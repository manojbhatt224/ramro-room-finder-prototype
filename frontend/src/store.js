import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';

import authReducer from "./slices/authSlice"
import listingReducer from "./slices/listingSlice"
import usersReducer from "./slices/userSlice"
import reviewReducer from "./slices/reviewSlice"
import chatReducer from "./slices/chatSlice"
import messageReducer from "./slices/messageSlice"
import storage from "redux-persist/lib/storage";



//combine all reducers
const rootReducer=combineReducers({
  auth:authReducer,
  listing: listingReducer,
  users: usersReducer,
  review: reviewReducer,
  chat: chatReducer,
  message: messageReducer
  })


//persistance configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Specify which reducers you want to persist
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export const persistor = persistStore(store);