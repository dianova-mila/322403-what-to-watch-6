import {createReducer} from "@reduxjs/toolkit";
import {requireAuthorization, loadUserInfo} from "../actions";

const initialState = {
  authorizationStatus: false,
  userInfo: {},
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });

  builder.addCase(loadUserInfo, (state, action) => {
    state.userInfo = action.payload;
  });
});

export {user};
