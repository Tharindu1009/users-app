import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://randomuser.me";

export const userSlice = createSlice({
    name: "users",
    initialState: { loading: false, errorMessage: "", list: [] },
    reducers: {
        getUsers: (state, action) => {
            state.loading = true;
        },
        getUsersResponse: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        handleError: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        }
    },
});

export const getUsersAsync = (data) => async (dispatch) => {
    let params = `api/?results=45`;

    /* Setting url parameters according to selected filters */
    if (data.gender && data.gender == "Gents") {
        params = `${params}&gender=male`;
    } else if (data.gender && data.gender == "Ladies") {
        params = `${params}&gender=female`;
    }

    try {
        dispatch(getUsers());
        axios({
            method: 'get',
            url: `${API_URL}/${params}`,
            responseType: 'json',
            proxy: "http://localhost:3000", /* Used this for preventing cors origin errors in localhost dev environment */
        })
            .then(function (response) {
                dispatch(getUsersResponse(response.data.results));
            })
    } catch (err) {
        dispatch(handleError(err.message));
    }
};

export const { getUsers, getUsersResponse, seedUsers, handleError } = userSlice.actions;
export default userSlice.reducer;