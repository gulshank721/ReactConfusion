import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

import { baseUrl } from '../shared/baseUrl';

// const initialState={
//  dishes:[],
//  isLoading:true,
//  errMess:null
// }

// First, create the thunk
export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async ()=>{
   return axios
      .get(baseUrl+'dishes').then((responce)=>responce.data);


   // await fetch(baseUrl+'dishes')
   // .then((res)=>res.json());
   
   
  }
  
)

const dishesSlice= createSlice({
    name: 'dishes',
    initialState:{
      dishes:[],
      isLoading:false,
      errMess:'',
  },
    extraReducers:(builder)=>{
         builder.addCase(fetchDishes.pending,(state)=>{
            state.isLoading = true; 
         })
         builder.addCase(fetchDishes.fulfilled,(state,action)=>{
            state.isLoading = false;
            // console.log("fulfilled ",state.dishes);
            state.dishes=action.payload;
            state.errMess=''; 
         })
         builder.addCase(fetchDishes.rejected,(state,action)=>{
            state.isLoading= false;
            state.dishes =[];
            state.errMess= action.error.message; 
         })


    },
})

// Action creators are generated for each case reducer function
// export const { dishLoading,dishFailed,addDishes } = dishesSlice.actions

export const dishLoading =(state)=>state.isLoading;

export default dishesSlice.reducer