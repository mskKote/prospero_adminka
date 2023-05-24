import React from 'react'
import { useRemoveSourceMutation } from '@entities/sources'
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import classes from "./DeleteSourceBtn.module.scss"
import { EnrichedSource } from '@entities/sources/model/types';

type Props = {
  source: EnrichedSource
}
export const RemoveSourceBtn = (props: Props) => {

  const [trigger] = useRemoveSourceMutation()

  function fireDeleteSourceAPI() {
    trigger({ rss_id: props.source.Source.rss_id })
  }

  const openModal = () => modals.openConfirmModal({
    title: "Подтверждение удаления",
    yOffset: "30vh",
    zIndex: 1202,
    onConfirm: () => {
      fireDeleteSourceAPI()
    },
    children: (
      <Text size="sm">
        Удаляем источник от <b>{props.source.Publisher.name}</b>
      </Text>
    ),
    labels: { confirm: 'Удалить', cancel: 'Оставить' },
    onCancel: () => console.log('Cancel'),
  })

  const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    openModal()
  }


  return <Button
    className={classes.actions}
    onClick={onDeleteClick}
    variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
    Удалить
  </Button>
}
