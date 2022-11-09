import { configureStore } from '@reduxjs/toolkit'
import  dcplReducer  from './reducerSlice'


export const store = configureStore({
  reducer: {
    dcpl:dcplReducer,
  },
})