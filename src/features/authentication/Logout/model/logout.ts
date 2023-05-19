import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi, clearSessionData } from '@entities/session'
import { sourcesApi, clearSourcesData } from '@entities/sources'
import { tagTypes } from '@shared/api'
import { wait } from '@shared/lib'
import { AppState } from '@app/store'

export const logoutThunk = createAsyncThunk<void, void, { state: AppState }>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(clearSessionData())
    dispatch(clearSourcesData())

    // Wait 10ms to invalidateTags in next event loop tick.
    // Otherwise after invalidate related requests with SESSION_TAG
    // will be started, but isAuthorized will still be equal to true
    await wait(10)

    // 👇 ATTENTION: This line clear all baseApi state instead of sessionApi
    // dispatch(sessionApi.util.resetApiState())

    dispatch(sessionApi.util.invalidateTags([tagTypes.SESSION_TAG]))
    dispatch(sourcesApi.util.invalidateTags([tagTypes.SOURCES_TAG]))
  }
)
