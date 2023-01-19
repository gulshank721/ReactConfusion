import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { act } from '@testing-library/react';
// import addComments from ''

const initialState={
 comments:[],
 isLoading:true,
 errMess:''
}

// First, create the thunk
export const fetchComments = createAsyncThunk('comments/fetchComments', async ()=>{
   return axios
   .get(baseUrl+'comments').then((responce)=>responce.data);
   } 
 )
 export const postComments = createAsyncThunk('comments/postComments', async (newComment)=>{
   return axios
   .post(baseUrl+'comments', newComment)
   .then((responce)=>responce.data)
   .then((responce)=>{console.log('post responce =',responce)})
   
   // .then((responce)=>dispatch(addComments(responce)))
   // .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); })
   
   } 
 )
  
export const commentsSlice= createSlice({
    name: 'comments',
    initialState,
    reducers:{
        addComments: (state,action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.comments. += 

            console.log(action);
           // var comment ={}
            var comment = action.payload;
         
            console.log("Comment: ", comment);
            // state.comments = state.comments.concat(comment);
           state.comments.push(comment);
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchComments.pending,(state)=>{
           state.isLoading= true; 
        })
        builder.addCase(fetchComments.fulfilled,(state,action)=>{
           state.isLoading= false;
           console.log("fulfilled ",state.comments);
           state.comments=action.payload;
           state.errMess=''; 
        })
        builder.addCase(fetchComments.rejected,(state,action)=>{
           state.isLoading= false;
           state.comments =[];
           state.errMess=action.error.message; 
        })

        //post comments
        builder.addCase(postComments.pending,(state)=>{
         state.isLoading= true; 
      })
        builder.addCase(postComments.fulfilled,(state,action)=>{
         state.isLoading=false;
         //Here action.payload is empty why?
         //pushed data is Available in - action.meta.arg
         const comment=action.meta.arg;
         console.log('case=',comment);
         console.log('case2=',action.meta.arg);
         state.comments.push(comment);
        
         // state.comments.push(comment);
      })
      builder.addCase(postComments.rejected,(state,action)=>{
         state.isLoading=false;
         // state.comments.push(action.payload);
         alert(action.error.message);
      })


   },
})
// Action creators are generated for each case reducer function
export const { addComments } = commentsSlice.actions
export const commentLoading =(state)=>state.isLoading;

export default commentsSlice.reducer