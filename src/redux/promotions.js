import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { baseUrl } from '../shared/baseUrl';

const initialState={
 promotions:[],
 isLoading:false,
 errMess:''
}

// First, create the thunk
export const fetchPromotions = createAsyncThunk(
    'promotions/fetchPromotions', async ()=>{
     return await fetch(baseUrl+'promotions')
     .then((res)=>res.json());
     
     
    }
    
  )
  
const promotionsSlice= createSlice({
    name: 'promotions',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchPromotions.pending,(state)=>{
           state.isLoading= true; 
        })
        builder.addCase(fetchPromotions.fulfilled,(state,action)=>{
           state.isLoading= false;
        //    console.log("fulfilled ",state.promotions);
           state.promotions=action.payload;
           state.errMess=''; 
        })
        builder.addCase(fetchPromotions.rejected,(state,action)=>{
           state.isLoading= false;
           state.promotions =[];
           state.errMess=action.error.message; 
        })


   },
})

// Action creators are generated for each case reducer function
// export const { addPromotions} = promotionsSlice.actions

export default promotionsSlice.reducer