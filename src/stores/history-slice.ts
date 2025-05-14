import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';
import {Prediction} from '../types/place';

export interface PlaceState {
  history: Prediction[];
}

const initialState: PlaceState = {
  history: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<Prediction>) => {
      state.history.unshift(action.payload); // add new element to the front
      if (state.history.length >= 10) {
        state.history.pop(); // remove the last element (oldest)
      }
    },
  },
});

export const {addHistory} = historySlice.actions;

export const historySelector = (state: RootState) => state.history.history;

export default historySlice.reducer;
