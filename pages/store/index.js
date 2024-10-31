import {  configureStore } from '@reduxjs/toolkit'
import translateReducer  from './slice/translateTextSlice'

 const store= configureStore({
    reducer: {
        translate:translateReducer
    },
})

export default store;