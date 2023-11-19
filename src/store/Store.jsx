import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {notesApi} from '../features/api/apiSlice';
import  {stateSlice}  from '../features/createslice/userSlice';

const store = configureStore({
    reducer:{
        [notesApi.reducerPath]: notesApi.reducer,
        toggle: stateSlice.reducer,
    },

    middleware :(getDefaultMiddleware)=> 
       getDefaultMiddleware().concat(notesApi.middleware),
});

setupListeners(store.dispatch);

export default store;