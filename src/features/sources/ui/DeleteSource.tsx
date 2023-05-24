import React from 'react'
import { Button } from '@mantine/core'
import { useRemoveSourceMutation } from '@entities/sources'
import classes from "./DeleteSource.module.scss"

type Props = {
  rss_id: string
}
export const RemoveSourceBtn = (props: Props) => {

  const [trigger, _] = useRemoveSourceMutation()

  function fireDeleteSourceAPI() {
    trigger({ rss_id: props.rss_id })
  }

  return <Button
    className={classes.actions}
    onClick={fireDeleteSourceAPI}
    variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
    Delete
  </Button>
}
