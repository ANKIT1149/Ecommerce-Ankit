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
         },

         updateUserSuccess: (state, action) => {
             state.Currentuser = action.payload
             state.error = null,
             state.loading = false
         },

         updateUserFailure : (state, action) => {
            state.error = action.payload,
            state.loading = false
         },

         updateUserStart: (state) => {
            state.loading = true
         },

         deleteuserStart : (state) => {
             state.loading = true
         },

         deleteuserFailure : (state, action) => {
            state.error = action.payload,
             state.loading = false
         },

         deleteUsersuccess : (state) => {
             state.Currentuser = null
             state.loading = false
             state.error = null
         },

         signOutUserStart: (state) => {
            state.loading = true;
          },
      
          signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
      
          signOutUserSuccess: (state) => {
            state.Currentuser = null;
            state.error = null;
            state.loading = false;
          },

    }
});

export const {signInFail, signInStart, signInSuccess, updateUserFailure, updateUserStart, updateUserSuccess, deleteUsersuccess, deleteuserFailure, deleteuserStart, signOutUserFailure, signOutUserStart, signOutUserSuccess} = UserSlice.actions;

export default UserSlice.reducer;
