import { sourcesApi } from '../api/sourcesApi'
import { EnrichedSource } from './types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

type sourcesSliceState = {
  search: string
  sources: EnrichedSource[]
  pagination: {
    page: number
    page_size: number
    total: number
  }
}

const initialState: sourcesSliceState = {
  search: "",
  sources: [],
  pagination: {
    page: 1,
    page_size: 25,
    total: 0
  },
}

export const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    // getSources: (state, action: PayloadAction<string>) => {
    //   state.sources[action.payload] = state.sources[action.payload] == false
    // },
    clearSourcesData: (state) => {
      state = initialState
    },
    searchSources: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
      state.pagination.page = initialState.pagination.page
    },
    paginateSources: (state, { payload }: PayloadAction<number>) => {
      state.pagination.page = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sourcesApi.endpoints.enrichedSources.matchFulfilled,
      (state: sourcesSliceState, { payload }) => {
        state.sources = payload.data
        state.pagination = payload.pagination
      }
    )
  },
})

export const {
  clearSourcesData,
  searchSources,
  paginateSources
} = sourcesSlice.actions
