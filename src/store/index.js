import { configureStore } from "@reduxjs/toolkit";
import userReducer from './User/user-slice'
import modelsReducer from './Medical/joho__-slice'
import membersReducer from './Member/members-slice'

const store = configureStore({
    reducer: {
        user: userReducer,
        models: modelsReducer,
        members: membersReducer,
    }
})

export default store