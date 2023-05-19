import {
  type PayloadAction,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { sourcesApi } from '../api/sourcesApi'
import { AppState } from '@app/store'
import { EnrichedSource } from './types'

type sourcesSliceState = {
  sources: EnrichedSource[]
  pagination: {
    page: number
    page_size: number
    total: number
  }
}

const initialState: sourcesSliceState = {
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


// export const selectIsInWishlist = createSelector(
//   (state: AppState) => state.sources.sources,
//   (_: AppState, rssId: string) => rssId,
//   (sources: Record<ProductId, boolean>, rssId: string): boolean => Boolean(sources[rssId])
// )

// export const selectProductIdsInWishlist = (state: AppState) =>
//   Object.keys(state.wishlist.products)
//     .filter(Boolean)
//     .map(Number) as ProductId[]

export const { clearSourcesData } = sourcesSlice.actions
