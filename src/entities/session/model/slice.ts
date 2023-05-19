import { createSlice } from '@reduxjs/toolkit'
import { sessionApi } from '../api/sessionApi'
import { AppState } from '@app/store'

type SessionSliceState =
  | {
    token: string
    userId: string
    expire: string
    isAuthorized: true
  }
  | {
    isAuthorized: false
    expire?: string
    token?: string
    userId?: string
  }

const initialState: SessionSliceState = {
  isAuthorized: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.token = undefined
      state.userId = undefined
      state.expire = undefined
      state.isAuthorized = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sessionApi.endpoints.login.matchFulfilled,
      (state: SessionSliceState, { payload }) => {
        state.isAuthorized = true

        // say TypeScript that isAuthorized = true
        if (state.isAuthorized) {
          state.expire = payload.expire
          state.token = payload.token
          state.userId = payload.userId
        }
      }
    )
  },
})

export const selectIsAuthorized = (state: AppState) =>
  state.session.isAuthorized

export const selectUserId = (state: AppState) => state.session.userId

export const { clearSessionData } = sessionSlice.actions
