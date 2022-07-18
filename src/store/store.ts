import { configureStore } from '@reduxjs/toolkit'
import starWarsPeopleReducer from './starWarsPeopleSlice'

const store = configureStore({
    reducer: {
        starWarsPeople: starWarsPeopleReducer.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;