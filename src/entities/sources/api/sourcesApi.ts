// import type { Product } from '@entities/product/@x/wishlist'
import { baseApi, tagTypes } from '@shared/api'
import { GetEnrichSourcesDTO } from './types'

export const sourcesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    enrichedSources: build.query<GetEnrichSourcesDTO, { search?: string, page?: number }>({
      query: ({ search, page }) => ({
        url: `/api/v1/RSS/getEnrichedSources?search=${search === "" ? "" : search}&page=${page ?? 1}`,
      }),
      providesTags: [tagTypes.SOURCES_TAG]
    }),
    // addToWishlist: build.mutation<{}, number[]>({
    //   query: (productsInWishlistIds) => ({
    //     url: `/products/wishlist`,
    //     method: 'PATCH',
    //     body: productsInWishlistIds,
    //     params: { delay: 500 },
    //   }),
    //   invalidatesTags: [tagTypes.SOURCES_TAG],
    // }),
  }),
})

export const { useEnrichedSourcesQuery, useLazyEnrichedSourcesQuery } = sourcesApi
