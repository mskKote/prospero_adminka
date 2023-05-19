import { combineReducers } from '@reduxjs/toolkit'
import { sessionSlice } from '@entities/session'
import { sourcesSlice } from '@entities/sources'
import { baseApi } from '@shared/api'
import { debugModeSlice } from '@shared/model'


// Регистрируем редюсеры
export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [sourcesSlice.name]: sourcesSlice.reducer,
  [debugModeSlice.name]: debugModeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})