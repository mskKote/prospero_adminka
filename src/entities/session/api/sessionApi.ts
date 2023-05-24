import { baseApi, methodTypes, tagTypes } from '@shared/api'
import { mapSession } from '../lib/mapSession'
import { type Session } from '../model/types'
import { type RequestLoginBody, type SessionDto } from './types'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, RequestLoginBody>({
      query: (body) => ({
        url: `/login`,
        method: methodTypes.POST,
        body,
      }),
      invalidatesTags: [tagTypes.SESSION_TAG],
      transformResponse: async (response: SessionDto) => await mapSession(response),
    })
  }),
})

export const { useLoginMutation } = sessionApi
