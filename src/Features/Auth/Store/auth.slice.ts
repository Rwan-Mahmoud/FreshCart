import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 
type User ={
    id ?: string,
    name : string ,  
    email ?: string , 
    role : string
}

 
export type authState = {
    isAuthenticated : boolean , 
    userInfo : null | User
}

const initialState : authState = {

    isAuthenticated: false,
    userInfo: null ,
  
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setAuthInfo : function (state, action:PayloadAction<authState>){
        state.isAuthenticated = action.payload.isAuthenticated;
        state.userInfo = action.payload.userInfo;
    }
  },
});

export const authReducer = authSlice.reducer ;
export const {setAuthInfo} = authSlice.actions