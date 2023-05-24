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
export type GetEnrichSourcesArgsDTO = {
  search?: string,
  page?: number
}

// 
export type RemoveSourceDTO = {
  message: string
}

export type RemoveSourceArgsDTO = {
  rss_id: string
}



export type UpdateSourceDTO = {
  rss_id: string
  rss_url: string
  publisher_id: string
}

export type DeletePublisherDTO = {
  publisher_id: string
}
