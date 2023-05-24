import { baseApi, tagTypes, methodTypes } from '@shared/api'
import {
  GetEnrichSourcesDTO, GetEnrichSourcesArgsDTO,
  RemoveSourceArgsDTO, RemoveSourceDTO,
  UpdateRespDTO, UpdateSourceDTO, UpdatePulblisherDTO,
  AddRespDTO, AddEnrichSourceDTO
} from './types'

export const sourcesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    enrichedSources: build.query<GetEnrichSourcesDTO, GetEnrichSourcesArgsDTO>({
      query: ({ search, page }) => ({
        url: `/api/v1/RSS/getEnrichedSources?page=${page ?? 1}${search === "" ? "" : `&search=${search}`}`,
      }),
      providesTags: [tagTypes.SOURCES_TAG]
    }),
    removeSource: build.mutation<RemoveSourceDTO, RemoveSourceArgsDTO>({
      query: (body) => ({
        url: `/api/v1/RSS/removeSource`,
        method: methodTypes.DELETE,
        body
      }),
      invalidatesTags: [tagTypes.SOURCES_TAG]
    }),
    updateSource: build.mutation<UpdateRespDTO, UpdateSourceDTO>({
      query: (body) => ({
        url: `/api/v1/RSS/updateSource`,
        method: methodTypes.PUT,
        body
      }),
      invalidatesTags: [tagTypes.SOURCES_TAG]
    }),
    updatePublisher: build.mutation<UpdateRespDTO, UpdatePulblisherDTO>({
      query: (body) => ({
        url: `/api/v1/updatePublisher`,
        method: methodTypes.PUT,
        body
      }),
      invalidatesTags: [tagTypes.SOURCES_TAG]
    }),
    addSourceAndPublisher: build.mutation<AddRespDTO, AddEnrichSourceDTO>({
      query: (body) => ({
        url: `/api/v1/addSourceAndPublisher`,
        method: methodTypes.POST,
        body
      }),
      invalidatesTags: [tagTypes.SOURCES_TAG]
    })
  }),
})

export const {
  useEnrichedSourcesQuery,
  useRemoveSourceMutation,
  useUpdatePublisherMutation,
  useUpdateSourceMutation,
  useAddSourceAndPublisherMutation
} = sourcesApi
