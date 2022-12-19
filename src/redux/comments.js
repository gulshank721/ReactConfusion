import { createSlice } from '@reduxjs/toolkit'

import { COMMENTS } from '../shared/comments';

const initialState={
 comments:COMMENTS,
}
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
           
            // comment.id=0;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            // state.comments = state.comments.concat(comment);
           state.comments.push(comment);
          },
    },
})
// Action creators are generated for each case reducer function
export const { addComments } = commentsSlice.actions

export default commentsSlice.reducer