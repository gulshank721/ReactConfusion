import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { baseUrl } from '../shared/baseUrl';

const initialState={
 leaders:[],
 isLoading:true,
 errMess:'',
}

// First, create the thunk
 export const fetchLeaders = createAsyncThunk(
    'leaders/fetchLeaders', async ()=>{
     return await fetch(baseUrl+'leaders')
     .then((res)=>res.json());
    }
  )
  
export const leadersSlice= createSlice({
    name: 'leaders',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchLeaders.pending,(state)=>{
           state.isLoading= true; 
        })
        builder.addCase(fetchLeaders.fulfilled,(state,action)=>{
           state.isLoading= false;
        //    console.log("fulfilled ",state.leaders);
           state.leaders=action.payload;
           state.errMess=''; 
        })
        builder.addCase(fetchLeaders.rejected,(state,action)=>{
           state.isLoading= false;
           state.leaders =[];
           state.errMess=action.error.message; 
        })


   },
})


// Action creators are generated for each case reducer function
// export const { addLeaders } = leadersSlice.actions

export default leadersSlice.reducer