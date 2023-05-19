import { useAppDispatch, useAppSelector, toggleDebugMode } from '@shared/model'
import css from './DebugModeToggler.module.scss'
import { useEffect, useState } from 'react'

export function DebugModeToggler() {
  const isDebugMode = useAppSelector((state) => state.debugMode.isEnabled)
  const dispatch = useAppDispatch()

  const [state, setState] = useState('')
  useEffect(() => {
    setState(isDebugMode ? '✅ debug mode' : '☑️ debug mode')
  }, [isDebugMode])

  return (
    <div className={css.root}>
      <button onClick={() => dispatch(toggleDebugMode())}>
        {state}
      </button>
    </div>
  )
}
