import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { StarWarsPeopleItem, StarWarsPeopleState } from '../types'

const initialState: StarWarsPeopleState = {
    people: [],
    countOfPeople: 0,
    starWarsPerson: null
}

export const starWarsPeopleSlice = createSlice({
    name: 'starWarsPeople',
    initialState,
    reducers: {
        setStarWarsPeople(state, action: PayloadAction<StarWarsPeopleItem[]>) {
            state.people = action.payload;
        },
        setCountOfPeople(state, action: PayloadAction<number>) {
            state.countOfPeople = Math.round(action.payload / 10);
        },
        setStarWarsPerson(state, action: PayloadAction<StarWarsPeopleItem | null>) {
            state.starWarsPerson = action.payload;
        }
    },
})

export default starWarsPeopleSlice;