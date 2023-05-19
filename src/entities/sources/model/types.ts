export type Publisher = {
  publisher_id: string
  add_date: Date
  name: string
  country: string
  city: string
  longitude: number
  latitude: number
}

export type Source = {
  rss_id: string
  rss_url: string
  publisher_id: string
  add_date: Date
}

export type EnrichedSource = {
  Source: Source,
  Publisher: Publisher
} 