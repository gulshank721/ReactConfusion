import { configureStore } from '@reduxjs/toolkit'
import  dcplReducer  from './reducerSlice'
import  dishesReducer from './dishes'
import  commentReducer from './comments'
import promotionsReducer from './promotions'
import leadersReducer from './leaders'


export const store = configureStore({
  reducer: {
    dcpl:dcplReducer,
    dishes:dishesReducer,
    comments:commentReducer,
    promotions:promotionsReducer,
    leaders:leadersReducer,

  },
})