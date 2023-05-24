import React from 'react'
import { useFeatureSlicedDebug } from '@shared/lib'
import { SourcesTable } from '@entities/sources'
import { useEnrichedSourcesQuery } from '@entities/sources'
import { useAppSelector } from '@shared/model'
import { AddSource } from '@features/sources'
import classes from "./LayoutSources.module.scss"

export const LayoutSources = () => {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutSources')
  const sourcesState = useAppSelector(({ sources }) => sources)
  const sourcesResponse = useEnrichedSourcesQuery({
    search: sourcesState.search,
    page: sourcesState.pagination.page
  })
  const sources = sourcesResponse.currentData?.data ?? []

  return <section {...rootAttributes} className={classes.section}>

    <div className={classes.tableWrapper}>

      <SourcesTable sources={sources} />
      <AddSource />
    </div>

  </section>
}
