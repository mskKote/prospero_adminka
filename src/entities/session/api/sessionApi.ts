import { baseApi, tagTypes } from '@shared/api'
import { mapSession } from '../lib/mapSession'
import { mapUser } from '../lib/mapAdmin'
import { type Admin, type Session } from '../model/types'
import { type AdminDto, type RequestLoginBody, type SessionDto } from './types'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [tagTypes.SESSION_TAG, tagTypes.SOURCES_TAG],
      transformResponse: async (response: SessionDto) => await mapSession(response),
    }),
    // TODO: FSD: Move to entities/user/api/userApi.ts
    me: build.query<Admin, void>({
      query: () => ({
        url: `/me`,
      }),
      providesTags: [tagTypes.SESSION_TAG],
      transformResponse: (response: AdminDto) => mapUser(response),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = sessionApi
