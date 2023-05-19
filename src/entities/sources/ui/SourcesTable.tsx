import React from 'react'
import { useFeatureSlicedDebug } from '@shared/lib'
import { EnrichedSource } from '../model/types'
import { Button, Group, ScrollArea, Table } from '@mantine/core'
import classes from "./SourcesTable.module.scss"

type Props = {
  sources: EnrichedSource[]
}

export const SourcesTable = (props: Props) => {
  const { rootAttributes } = useFeatureSlicedDebug('entity/SourcesTable')

  const rows = props.sources.map((source, i) => {
    return (
      <tr key={source.Source.rss_id}>
        {/* <th>№</th> */}
        <td>{i + 1}</td>
        {/* <th>Источник</th> */}
        <td>{source.Publisher.name}</td>
        {/* <th>Страна</th> */}
        <td>{source.Publisher.country}</td>
        {/* <th>Город</th> */}
        <td>{source.Publisher.city}</td>
        {/* <th>Координаты</th> */}
        <td>
          <Group position="apart">
            {source.Publisher.longitude}
            {source.Publisher.latitude}
          </Group>
        </td>
        {/* <th>Ссылка</th> */}
        <td>{source.Source.rss_url}</td>

        {/* <th>Действия</th> */}
        <td>
          <Group position="apart">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </Group>
        </td>
      </tr>
    );
  });


  return <div {...rootAttributes} className={classes.tableWrapper}>

    <ScrollArea>
      <div className={classes.table}>

        <Button>ADD+</Button>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>№</th>
              <th>Источник</th>
              <th>Страна</th>
              <th>Город</th>
              <th>Координаты</th>
              <th>Ссылка</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {/* тест строка - вынести в новую? */}
            {rows}
          </tbody>
        </Table>
      </div>
    </ScrollArea>

  </div>
}
