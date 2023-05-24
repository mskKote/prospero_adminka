import React, { InputHTMLAttributes, useState } from 'react'
import { useFeatureSlicedDebug } from '@shared/lib'
import { EnrichedSource } from '../model/types'
import { Button, Flex, Group, Input, ScrollArea, Table } from '@mantine/core'
import { RemoveSourceBtn } from '@features/sources'
import classes from "./SourcesTable.module.scss"


type Props = {
  sources: EnrichedSource[]
}

export const SourcesTable = (props: Props) => {
  const { rootAttributes } = useFeatureSlicedDebug('entity/SourcesTable')
  const [editRssID, setEditRssID] = useState<string>("")

  const inputCell = (column: string, defaultValue: string, disabled: boolean, other?: InputHTMLAttributes<HTMLInputElement>) =>
    <Input
      className={other?.className}
      placeholder={column}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  const isDisabled = (source: EnrichedSource) => source.Source.rss_id !== editRssID


  const rows = props.sources.map((source, i) => (
    <tr key={source.Source.rss_id}>
      {/* <th>№</th> */}
      <td>{i + 1}</td>
      {/* <th>Источник</th> */}
      <td className={classes.smallColumn}>{inputCell("name", source.Publisher.name, isDisabled(source))}</td>
      {/* <th>Страна</th> */}
      <td className={classes.smallColumn}>{inputCell("country", source.Publisher.country, isDisabled(source))}</td>
      {/* <th>Город</th> */}
      <td className={classes.smallColumn}>{inputCell("city", source.Publisher.city, isDisabled(source))}</td>
      {/* <th>Координаты</th> */}
      <td className={classes.smallColumn}>
        <Flex direction={"row"} gap={"md"}>
          {inputCell("longitude", `${source.Publisher.longitude}`, isDisabled(source))}
          {inputCell("latitude", `${source.Publisher.latitude}`, isDisabled(source))}
        </Flex>
      </td>
      {/* , { className: classes.coordsColumn } */}
      {/* <th>Ссылка</th> */}
      <td style={{ alignItems: "center" }}>{inputCell("url", `${source.Source.rss_url}`, isDisabled(source))}</td>

      {/* <th>Действия</th> */}
      <td className={classes.smallColumn}>
        <Group position="center">
          {source.Source.rss_id !== editRssID
            // edit RSS
            ? <Button
              className={classes.actions}
              variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              onClick={() => setEditRssID(source.Source.rss_id)}>
              Edit
            </Button>
            // feature: EDIT DONE 
            : <Button
              variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              onClick={() => setEditRssID("")}>
              Done
            </Button>}
          <RemoveSourceBtn rss_id={source.Source.rss_id} />
        </Group>
      </td>
    </tr >
  ));


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
              <th style={{ textAlign: "center" }}>Координаты</th>
              <th style={{ textAlign: "center" }}>Ссылка</th>
              <th style={{ textAlign: "center" }}>Действия</th>
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
