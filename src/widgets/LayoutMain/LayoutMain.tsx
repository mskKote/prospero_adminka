import React, { ReactNode } from 'react'
// import { DebugModeToggler } from '@widgets/DebugModeToggler'
import { LayoutHeader } from '@widgets/LayoutHeader'
import classes from "./LayoutMain.module.scss"

type Props = {
  children?: ReactNode | undefined
}

export const LayoutMain = ({ children }: Props) => {
  return <>
    <main className={classes.main}>
      <LayoutHeader />
      {children}

      {/* <DebugModeToggler /> */}
    </main>
  </>
}
