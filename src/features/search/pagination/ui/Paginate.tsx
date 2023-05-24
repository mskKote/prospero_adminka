import React from 'react'
import { paginateSources } from '@entities/sources'
import { Pagination } from '@mantine/core'
import { useFeatureSlicedDebug } from '@shared/lib'
import { useAppDispatch, useAppSelector } from '@shared/model'

export const Paginate = () => {
  const { rootAttributes } = useFeatureSlicedDebug('feature/LoginForm')
  const dispatch = useAppDispatch()
  const pagination = useAppSelector(({ sources }) => sources.pagination)
  const totalPages = 1 + pagination.total / pagination.page_size

  function paginate(page: number) {
    console.log("Меняем страницу страницу", page)
    dispatch(paginateSources(page))
  }

  return (
    <Pagination
      {...rootAttributes}
      value={pagination.page}
      onChange={paginate}
      total={totalPages}
      position="center"
      styles={(theme) => ({
        control: {
          '&[data-active]': {
            backgroundImage: theme.fn.gradient({ from: '#ed6ea0', to: '#ec8c69', deg: 35 }),
          },
        },
      })}
    />
  )
}