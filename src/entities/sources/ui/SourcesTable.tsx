import React, { InputHTMLAttributes, useState } from 'react'
import { useFeatureSlicedDebug } from '@shared/lib'
import { EnrichedSource } from '../model/types'
import { Button, Flex, Group, Input, ScrollArea, Table } from '@mantine/core'
import { EditSourceBtn, RemoveSourceBtn } from '@features/sources'
import classes from "./SourcesTable.module.scss"

type columns = "name" | "country" | "city" | "longitude" | "latitude" | "url"

type Props = {
  sources: EnrichedSource[]
}
export const SourcesTable = (props: Props) => {
  const { rootAttributes } = useFeatureSlicedDebug('entity/SourcesTable')
  const initial = {
    rss_id: "",
    edited: {
      name: "",
      country: "",
      city: "",
      longitude: "",
      latitude: "",
      url: "",
    }
  }
  const [editSource, setEditSource] = useState<{
    rss_id: string,
    edited: {
      name: string,
      country: string,
      city: string,
      longitude: string,
      latitude: string,
      url: string,
    }
  }>(initial)

  const inputCell = (column: columns, originalValue: string, editing: boolean, other?: InputHTMLAttributes<HTMLInputElement>) =>
    <Input
      className={other?.className}
      placeholder={column}
      value={editing ? originalValue : editSource.edited[column]}
      disabled={editing}
      onChange={(e) => {
        setEditSource(prev => ({ ...editSource, edited: { ...prev.edited, [column]: e.target.value } }))
      }}
    />
  const isDisabled = (source: EnrichedSource) => source.Source.rss_id !== editSource.rss_id


  const rows = props.sources.map((source, i) => (
    <tr key={source.Source.rss_id}>
      {/* № */}
      <td>{i + 1}</td>
      {/* Источник */}
      <td className={classes.smallCol}>
        {inputCell("name", source.Publisher.name, isDisabled(source))}
      </td>
      {/* Страна */}
      <td className={classes.smallCol}>
        {inputCell("country", source.Publisher.country, isDisabled(source))}
      </td>
      {/* Город */}
      <td className={classes.smallCol}>
        {inputCell("city", source.Publisher.city, isDisabled(source))}
      </td>
      {/* Координаты */}
      <td className={classes.smallCol}>
        <Flex direction={"row"} gap={"md"}>
          {inputCell("longitude", `${source.Publisher.longitude}`, isDisabled(source))}
          {inputCell("latitude", `${source.Publisher.latitude}`, isDisabled(source))}
        </Flex>
      </td>
      {/* , { className: classes.coordsColumn } */}
      {/* Ссылка */}
      <td style={{ alignItems: "center" }}>
        {inputCell("url", `${source.Source.rss_url}`, isDisabled(source))}
      </td>

      {/* Действия */}
      <td className={classes.smallCol}>
        <Group position="center">
          {source.Source.rss_id !== editSource?.rss_id
            // EDIT
            ? <>
              <Button
                className={classes.actions}
                variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                onClick={() => setEditSource({
                  rss_id: source.Source.rss_id,
                  edited: {
                    name: source.Publisher.name,
                    country: source.Publisher.country,
                    city: source.Publisher.city,
                    longitude: `${source.Publisher.longitude}`,
                    latitude: `${source.Publisher.latitude}`,
                    url: source.Source.rss_url,
                  }
                })}>
                🖋️
              </Button>
              <RemoveSourceBtn source={source} />
            </>
            // EDIT DONE 
            : <>
              <EditSourceBtn done={() => setEditSource(initial)} original={source} edited={{
                Source: {
                  ...source.Source,
                  rss_url: editSource.edited.url,
                },
                Publisher: {
                  ...source.Publisher,
                  name: editSource.edited.name,
                  country: editSource.edited.country,
                  city: editSource.edited.city,
                  longitude: +editSource.edited.longitude,
                  latitude: +editSource.edited.latitude,
                }
              }} />
              <Button
                className={classes.actions}
                onClick={() => setEditSource(initial)}
                variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                Отмена
              </Button>
            </>}
        </Group>
      </td>
    </tr >
  ));


  return <ScrollArea className={classes.table} {...rootAttributes}>

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
        {rows}
      </tbody>
    </Table>
  </ScrollArea>
}
