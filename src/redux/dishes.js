import { createSlice } from '@reduxjs/toolkit'

import { DISHES } from '../shared/dishes';

const initialState={
 dishes:DISHES,
 isLoading:true,
 errMess:null
}
export const dishesSlice= createSlice({
    name: 'dishes',
    initialState,
    reducers:{
        addDishes: (state,action) => {
            // console.log(action.payload[0]);
            // console.log(action.payload.length);

            state.isLoading= false; 
            state.errMess=null;
            state.dishes.push(action.payload);
            // action.payload.forEach(element => {
            //     console.log(element);
            //     state.dishes.push(element);
            // });
            console.log(state.dishes)
          },
        dishLoading:(state,action)=>{
            state.isLoading= true;
             state.errMess= null;
            state.dishes= [];
        },
        dishFailed:(state,action)=>{
            state.isLoading= false;
             state.errMess=action.payload;
        }
    },
})
// Define a thunk that dispatches those action creators
// export const fetchDishes = () => async(dispatch) => {

//     dispatch(dishLoading(true));

//     setTimeout(() => {
//         dispatch(addDishes(DISHES));
//     }, 2000);
// }

// Action creators are generated for each case reducer function
export const { dishLoading,dishFailed,addDishes } = dishesSlice.actions

export default dishesSlice.reducer