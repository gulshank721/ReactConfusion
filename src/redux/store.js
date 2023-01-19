import { configureStore } from '@reduxjs/toolkit'
import { createForms } from 'react-redux-form'
// import  dcplReducer  from './reducerSlice'
import  dishesReducer from './dishes'
import  commentReducer from './comments'
import promotionsReducer from './promotions'
import leadersReducer from './leaders'
import authReducer from './auth'
import favoritesReducer from './favorites'
import { InitialFeedback } from './forms'
// import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'


export const store = configureStore({
  reducer: {
   
    dishes:dishesReducer,
    comments:commentReducer,
    promotions:promotionsReducer,
    leaders:leadersReducer,
    auth: authReducer,
    favorites:favoritesReducer,
    ...createForms({
       feedback:InitialFeedback
    })
  },
})