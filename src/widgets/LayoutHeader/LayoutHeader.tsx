import React from 'react'
import { LogoutButton } from '@features/authentication/Logout'
import { Flex, Group, Header } from '@mantine/core'
import { Paginate, SearchString } from '@features/search'
import { useFeatureSlicedDebug } from '@shared/lib'
import classes from "./LayoutHeader.module.scss"

export const LayoutHeader = () => {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutHeader')

  return (<Header height={'auto'} className={classes.header} {...rootAttributes}>
    <Flex direction="row" justify="space-between">
      <Group w={"100%"}>
        <SearchString />
        <Paginate />
      </Group>

      <LogoutButton />
    </Flex>
  </Header >)
}
