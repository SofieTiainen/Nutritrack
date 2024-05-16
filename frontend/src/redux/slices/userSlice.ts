import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

const initialState: UserState = {
  firstName: null,
  lastName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    clearUserProfile: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
