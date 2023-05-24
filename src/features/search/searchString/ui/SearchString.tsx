import React from 'react'
import { useDebouncedState } from '@mantine/hooks'
import { useDidUpdateEffect, useFeatureSlicedDebug } from '@shared/lib'
import { useAppDispatch } from '@shared/model';
import { TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react';
import { searchSources } from '@entities/sources';
import classes from "./SearchString.module.scss"

export const SearchString = () => {
  const { rootAttributes } = useFeatureSlicedDebug('feature/SearchString')
  const [search, setSearch] = useDebouncedState("", 200);
  const dispatch = useAppDispatch()

  useDidUpdateEffect(() => {
    console.log("run trigger", search);
    dispatch(searchSources(search))
  }, [search])

  return <div {...rootAttributes}>
    <TextInput
      className={classes.search}
      type='search'
      placeholder="Поиск источников RSS"
      defaultValue={search}
      onChange={e => setSearch(e.currentTarget.value)}
      icon={<Search size="0.8rem" />}
    />
  </div>
}