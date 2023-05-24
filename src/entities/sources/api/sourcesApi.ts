import { baseApi, tagTypes, methodTypes } from '@shared/api'
import {
  GetEnrichSourcesDTO, GetEnrichSourcesArgsDTO,
  RemoveSourceArgsDTO, RemoveSourceDTO,
} from './types'

export const sourcesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    enrichedSources: build.query<GetEnrichSourcesDTO, GetEnrichSourcesArgsDTO>({
      query: ({ search, page }) => ({
        url: `/api/v1/RSS/getEnrichedSources?page=${page ?? 1}${search === "" ? "" : `&search=${search}`}`,
      }),
      providesTags: [tagTypes.SOURCES_TAG]
    }),
    // searchSources: build.mutation<GetEnrichSourcesDTO, GetEnrichSourcesArgsDTO>({
    //   query: ({ search, page }) => ({
    //     url: `/api/v1/RSS/getEnrichedSources?page=${page ?? 1}${search === "" ? "" : `&search=${search}`}`,
    //   }),
    //   invalidatesTags: [tagTypes.SOURCES_TAG]
    // }),
    removeSource: build.mutation<RemoveSourceDTO, RemoveSourceArgsDTO>({
      query: (body) => ({
        url: `/api/v1/RSS/removeSource`,
        method: methodTypes.DELETE,
        body
      }),
      invalidatesTags: [tagTypes.SOURCES_TAG]
    })
    //TODO: edit, add
  }),
})

export const {
  useEnrichedSourcesQuery,
  useRemoveSourceMutation
} = sourcesApi
