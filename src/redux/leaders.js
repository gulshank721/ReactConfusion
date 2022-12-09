import { createSlice } from '@reduxjs/toolkit'
import { LEADERS } from '../shared/leaders';

const initialState={
 leaders:LEADERS,
}
export const leadersSlice= createSlice({
    name: 'leaders',
    initialState,
    reducers:{
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
          },
    },
})
// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = leadersSlice.actions

export default leadersSlice.reducer