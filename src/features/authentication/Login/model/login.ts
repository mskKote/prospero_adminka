import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@entities/session'
import { isFetchBaseQueryError } from '@shared/api'
import { AppState } from '@app/store'

type Params = {
  username: string
  password: string
}

export const loginThunk = createAsyncThunk<void, Params, { state: AppState }>(
  'authentication/login',
  async (body: Params, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      throw new Error('Unknown error')
    }
  }
)
