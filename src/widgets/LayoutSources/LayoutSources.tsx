import React from 'react'
import { useFeatureSlicedDebug } from '@shared/lib'
import { SourcesTable } from '@entities/sources'
import { useEnrichedSourcesQuery } from '@entities/sources'
import { useAppSelector } from '@shared/model'
import classes from "./LayoutSources.module.scss"

export const LayoutSources = () => {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutSources')
  const sourcesState = useAppSelector(({ sources }) => sources)
  const sourcesResponse = useEnrichedSourcesQuery({
    search: sourcesState.search,
    page: sourcesState.pagination.page
  })

  console.log(sourcesResponse);
  const sources = sourcesResponse.currentData?.data ?? []

  return <section {...rootAttributes} className={classes.section}>
    {/* Таблица источников */}
    <SourcesTable sources={sources} />

  </section>
}
