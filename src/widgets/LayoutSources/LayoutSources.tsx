import React from 'react'
import { useFeatureSlicedDebug } from '@shared/lib'
import { SourcesTable } from '@entities/sources'
import { useEnrichedSourcesQuery } from '@entities/sources'
import classes from "./LayoutSources.module.scss"

export const LayoutSources = () => {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutSources')
  const sourcesResponse = useEnrichedSourcesQuery({ search: "", page: 1 })
  const sources = sourcesResponse.data?.data ?? []

  return <section {...rootAttributes} className={classes.section}>
    {/* Таблица источников */}
    <SourcesTable sources={sources} />

  </section>
}
