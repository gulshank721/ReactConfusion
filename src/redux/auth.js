import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';
import fetchFavorites from './favorites';
import { useDispatch } from 'react-redux';
import favorites from './favorites';

const initialState={
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}
function fetchfav(fetchFavorites){
    const dispatch = useDispatch();
    dispatch(fetchFavorites);
}

export const loginUser = createAsyncThunk('auth/loginUser', async ( creds)=>{
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log('in loginUser thunk');
    return await fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            console.log('after login',localStorage.getItem('token'),localStorage.getItem('creds'))
            // Dispatch the success action
            // dispatch(fetchFavorites());
            //  fetchfav(fetchFavorites);
            // dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    // .then((response) => response.data)
  } 
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async ( )=>{
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log('in logoutUser thunk');
    console.log(localStorage.getItem('token'));
    // dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    // dispatch(favoritesFailed("Error 401: Unauthorized"))
    // dispatch(receiveLogout())
    // .then(response => response.json())

   }
 )

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        //login reducers
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isFetching= true;
                state.isAuthenticated= false
                state.user= action.creds 
         })
         builder.addCase(loginUser.fulfilled,(state,action)=>{
            console.log('In action loginUSer',action.meta.arg,action.payload);
            state.isFetching= false;
            // localStorage.setItem('token', action.payload.token);
            // localStorage.setItem('creds', JSON.stringify(creds));
            state.isAuthenticated= true;
            state.token= action.token;
            state.errMess=''; 
            state.user=action.meta.arg.username;
         })
         builder.addCase(loginUser.rejected,(state,action)=>{
            state.isFetching= false;
            state.errMess=action.error.message; 
         })
         //logout reducers
         builder.addCase(logoutUser.pending,(state,action)=>{
            state.isFetching= true;
                state.isAuthenticated= true
                // state.user= action.creds 
         })
         builder.addCase(logoutUser.fulfilled,(state,action)=>{
            state.isFetching = false;
            state.isAuthenticated = false;
            state.token= '';
            state.user= null
         })
         builder.addCase(logoutUser.rejected,(state,action)=>{
            state.isFetching= false;
            state.isAuthenticated= true;
            state.errMess= action.error.message;
         })
    }
})
export const { } = authSlice.actions
// export const favoriteLoading =(state)=>state.isLoading;

export default authSlice.reducer