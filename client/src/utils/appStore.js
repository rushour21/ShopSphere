import { configureStore  } from "@reduxjs/toolkit";
import  userReducer from './userSlice'



const appStore = configureStore({
    reducer:{
        loggedUser:userReducer,
    }
})

export default appStore