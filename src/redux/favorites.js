import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';

const initialState={
    favorites:null,
    isLoading:true,
    errMess:''
}

// First, create the thunk
// export const fetchFavorites = () => (dispatch) => {
//     dispatch(favoritesLoading(true));

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'favorites', {
//         headers: {
//             'Authorization': bearer
//         },
//     })
//     .then(response => {
//         if (response.ok) {
//             return response;
//         }
//         else {
//             var error = new Error('Error ' + response.status + ': ' + response.statusText);
//             error.response = response;
//             throw error;
//         }
//     },
//     error => {
//         var errmess = new Error(error.message);
//         throw errmess;
//     })
//     .then(response => response.json())
//     .then(favorites => dispatch(addFavorites(favorites)))
//     .catch(error => dispatch(favoritesFailed(error.message)));
// }
//
export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async ()=>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log('fetchFavo',bearer);

    return await fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
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
    } 
  )
export const postFavorites = createAsyncThunk('favorites/postFavorites', async ( dishId)=>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log('postFavo',bearer);


    return await fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({"_id": dishId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
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
  } 
)

export const deleteFavorites = createAsyncThunk('favorites/deleteFavorites', async ( dishId)=>{
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return await fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
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
  } 
)

export const favoritesSlice = createSlice({
    name:'favorites',
    initialState,
    reducers:{
        addFavorites: (state,action) => {
            console.log(action);
            // var comment ={}
             var favorite = action.payload;
          
             console.log("Favorite: ", favorite);
             // state.comments = state.comments.concat(comment);
            // state.favorites.push(favorite);
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchFavorites.pending,(state)=>{
            state.isLoading= true; 
            state.favorites= null;
         })
         builder.addCase(fetchFavorites.fulfilled,(state,action)=>{
            state.isLoading= false;
            console.log('In fetchfav reducer',action);
            state.favorites= action.payload;
            console.log("fulfilled fetchFavorites favorites.favorites ",state.favorites);
            state.errMess=''; 
         })
         builder.addCase(fetchFavorites.rejected,(state,action)=>{
            state.isLoading= false;
            state.favorites =null;
            state.errMess=action.error.message; 
         })
        //
        builder.addCase(postFavorites.pending,(state)=>{
           state.isLoading= true; 
        })
        builder.addCase(postFavorites.fulfilled,(state,action)=>{
            state.isLoading=false;
            // const favorite=action.meta.arg;
            const favorite = action.payload;
            console.log('In postFavo reducer',action.payload);
            // console.log('case2=',action.meta.arg);
            state.favorites = favorite;
        })
        builder.addCase(postFavorites.rejected,(state,action)=>{
           state.isLoading= false;
           state.favorites =[];
           state.errMess=action.error.message; 
        })
        //
        builder.addCase(deleteFavorites.pending,(state)=>{
            state.isLoading= true; 
         })
         builder.addCase(deleteFavorites.fulfilled,(state,action)=>{
            state.isLoading= false;
            console.log("fulfilled ",state.favorites);
            state.favorites=action.payload;
            state.errMess=''; 
         })
         builder.addCase(deleteFavorites.rejected,(state,action)=>{
            state.isLoading= false;
            state.favorites =[];
            state.errMess=action.error.message; 
         })
    }
}) 
// Action creators are generated for each case reducer function
export const { addFavorites } = favoritesSlice.actions
export const favoriteLoading =(state)=>state.isLoading;

export default favoritesSlice.reducer