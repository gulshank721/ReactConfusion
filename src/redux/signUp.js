import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';
import fetchFavorites from './favorites';
import { useDispatch } from 'react-redux';
import favorites from './favorites';

const initialState={
    isLoading: false,
    statusMessage:'',
   //  isAuthenticated: localStorage.getItem('token') ? true : false,
   //  token: localStorage.getItem('token'),
   //  user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}

export const SignUpUser = createAsyncThunk('signUp/SignUpUser', async (newUser)=>{
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    // console.log('In signUp thunk',firstName,lastName,username,password);
    console.log('User To register', newUser);

  return await fetch(baseUrl + 'users/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        //   'Origin':'http://localhost:3001'
      },
      body: JSON.stringify(newUser),
     
    //   credentials: 'same-origin'
  })
  .then(response => {
      if (response.ok) {
          alert("User registerd successfully."+response.statusText);
          return response;
      }
      else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
  },
  error => {
      var errmess = new Error(error.message);
      throw errmess;
  })
  .then(response => response.json())
  .catch(error => { alert('User could not be registered: '+ error.message); })
});

 export const signUpSlice = createSlice({
    name:'signUp',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
         //logout reducers
         builder.addCase(SignUpUser.pending,(state,action)=>{
            state.isLoading= true;
                state.statusMessage='Registering';
                // state.user= action.creds 
         })
         builder.addCase(SignUpUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            console.log("In signup builder case"+action);
            state.statusMessage= action.payload;
         })
         builder.addCase(SignUpUser.rejected,(state,action)=>{
            state.isLoading= false;
            state.errMess= action.error.message;
         })
    }
})