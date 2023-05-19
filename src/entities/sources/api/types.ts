import { EnrichedSource } from "../model/types"

export type GetEnrichSourcesDTO = {
  data: EnrichedSource[],
  message: string,
  pagination: {
    page: number
    page_size: number
    total: number
  }
}