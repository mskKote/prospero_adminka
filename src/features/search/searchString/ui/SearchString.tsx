import React, { useEffect } from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { useFeatureSlicedDebug } from '@shared/lib'
import { useLazyEnrichedSourcesQuery } from '@entities/sources'
import { TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react';
import classes from "./SearchString.module.scss"

export const SearchString = () => {
  const { rootAttributes } = useFeatureSlicedDebug('feature/SearchString')
  const [search, setSearch] = useDebouncedState("", 200);
  const [trigger,] = useLazyEnrichedSourcesQuery()


  useEffect(() => {
    if (search.length < 2) return;
    trigger({ search, page: 1 })
  }, [search])

  return (
    <div {...rootAttributes}>
      <TextInput
        className={classes.search}
        type='search'
        placeholder="Поиск источников RSS"
        defaultValue={search}
        onChange={e => setSearch(e.currentTarget.value)}
        icon={<Search size="0.8rem" />}
      />
    </div>
  )
}