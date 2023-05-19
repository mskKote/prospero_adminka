import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypes } from './tags'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: [tagTypes.SOURCES_TAG, tagTypes.SESSION_TAG],
  baseQuery: baseQueryWithReauth,
  endpoints: _ => ({})
})