import starWarsPeopleSlice from "./starWarsPeopleSlice";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import starWarsPeopleService from './starWarsService'

export const starWarsPeopleActions = starWarsPeopleSlice.actions;

export const fetchStarWarsPeople = (payload: {page: number, search?: string}): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        dispatch(starWarsPeopleActions.setStarWarsPeople([]))
        const response = await starWarsPeopleService.getAllStarWarsPeople(payload);
        if (response.results) {
            dispatch(starWarsPeopleActions.setStarWarsPeople(response.results))
            dispatch(starWarsPeopleActions.setCountOfPeople(response.count))
        }
    }
}

export const fetchStarWarsPerson = (userId: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        dispatch(starWarsPeopleActions.setStarWarsPerson(null));
        const response = await starWarsPeopleService.getStarWarsPerson(userId);
        dispatch(starWarsPeopleActions.setStarWarsPerson(response));
    }
}