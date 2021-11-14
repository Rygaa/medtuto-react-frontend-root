import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accounts: []
}

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setAccounts: (state, { payload: accounts }) => {
            state.accounts = accounts;
        },
    }
})

export const membersActions = membersSlice.actions;
export default membersSlice.reducer;