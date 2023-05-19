import { Pagination } from '@mantine/core'
import { useFeatureSlicedDebug } from '@shared/lib'
import { useAppSelector } from '@shared/model'
import React from 'react'

// TODO: вызвать поиск
export const Paginate = () => {
  const { rootAttributes } = useFeatureSlicedDebug('feature/LoginForm')

  const pagination = useAppSelector(({ sources }) => sources.pagination)
  const totalPages = pagination.total / pagination.page_size

  return (
    <Pagination
      {...rootAttributes}
      defaultValue={pagination.page}
      onChange={() => console.log("Сменили страницу")}
      total={10}
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