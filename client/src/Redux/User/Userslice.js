import {createSlice} from "@reduxjs/toolkit";

const initialState = {
     Currentuser: null,
     error: null,
     loading: false,
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
         signInStart : (state) => {
             state.loading = true;
         },

         signInSuccess: (state, action) => {
             state.Currentuser = action.payload,
             state.error = null;
             state.loading = false;
           
         },

         signInFail: (state, action) => {
            state.error = action.payload,
            state.loading = false;
         }

    }
});

export const {signInFail, signInStart, signInSuccess} = UserSlice.actions;

export default UserSlice.reducer;
