import React from 'react'
import { EnrichedSource } from '@entities/sources/model/types'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useUpdatePublisherMutation, useUpdateSourceMutation } from '@entities/sources'

type Props = {
  original: EnrichedSource
  edited: EnrichedSource
  done: () => void
}
export const EditSourceBtn = ({ original, edited, done }: Props) => {
  const [triggerUpdatePublisher] = useUpdatePublisherMutation()
  const [triggerUpdateSource] = useUpdateSourceMutation()

  function fireUpdateSourceAPI() {
    console.table([
      { ...edited.Publisher, ...edited.Source },
      { ...original.Publisher, ...original.Source }
    ]);

    if (JSON.stringify(original.Publisher) !== JSON.stringify(edited.Publisher)) {
      triggerUpdatePublisher(edited.Publisher)
    }
    if (original.Source.rss_url !== edited.Source.rss_url) {
      triggerUpdateSource(edited.Source)
    }
    done()
  }

  const openModal = () => modals.openConfirmModal({
    title: "Подтверждение редактирования",
    yOffset: "30vh",
    zIndex: 1202,
    onConfirm: () => {
      fireUpdateSourceAPI()
    },
    labels: { confirm: 'Редактировать', cancel: 'Отменить' },
    onCancel: () => console.log('Cancel'),
  })

  const onEditClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    openModal()
  }

  return <Button
    variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}
    onClick={onEditClick}>
    ✔️
  </Button>
}
