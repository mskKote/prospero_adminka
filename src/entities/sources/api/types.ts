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


export type RemoveSourceDTO = {
  message: string
}
export type RemoveSourceArgsDTO = {
  rss_id: string
}


export type UpdateRespDTO = {
  message: string
}
export type UpdateSourceDTO = {
  rss_id: string
  rss_url: string
  publisher_id: string
}
export type UpdatePulblisherDTO = {
  publisher_id: string
  add_date: Date
  name: string
  country: string
  city: string
  longitude: number
  latitude: number
}


export type AddEnrichSourceDTO = {
  name: string
  country: string
  city: string
  longitude: number
  latitude: number
  rss_url: string
}
export type AddRespDTO = {
  message: string
}
