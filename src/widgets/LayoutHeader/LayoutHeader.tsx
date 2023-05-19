import React from 'react'
import { LogoutButton } from '@features/authentication/Logout'
import { Flex, Group, Header } from '@mantine/core'
import { useAppSelector } from '@shared/model'
import classes from "./LayoutHeader.module.scss"
import { Paginate, SearchString } from '@features/search'
import { useFeatureSlicedDebug } from '@shared/lib'

export const LayoutHeader = () => {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutHeader')
  const isAuth = useAppSelector(({ session }) => session.isAuthorized)

  if (isAuth == false) {
    return <></>
  }

  return (<Header height={'auto'} className={classes.header} {...rootAttributes}>
    <Flex direction="row" justify="space-between">
      <Group w={"100%"}>
        <SearchString />
        <Paginate />
      </Group>
      {/* <Center w={"100%"}>
      </Center> */}
      <LogoutButton />
    </Flex>
  </Header >)
}
