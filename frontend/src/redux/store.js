
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from '../../redux/api/apiSlice'
import authReducer from '../../redux/features/auth/authSlice'


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
})

setupListeners(store.dispatch)
export default store;