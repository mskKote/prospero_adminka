import { useCallback } from 'react'
import { useForm } from '@mantine/form'
import { useFeatureSlicedDebug } from '@shared/lib'
import { useAppDispatch } from '@shared/model'
import { Box, Button, PasswordInput, TextInput } from '@mantine/core'
import { loginThunk } from '../../model/login'
import css from './LoginForm.module.scss'
import type { LoginFormSchema } from '../../model/loginFormSchema'

type Props = {
  onComplete?: () => void
}

export function LoginForm(props: Props) {
  const { rootAttributes } = useFeatureSlicedDebug('feature/LoginForm')
  const dispatch = useAppDispatch()
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    // validate: {
    //   username: (value) => value.length > 0 ? 'Имя админа необходимо' : null,
    //   password: (value) => value.length > 5 ? 'Пароль составляет больше 6 символов' : null,
    // },
  });


  const onSubmitHandler = useCallback(
    ({ username, password }: LoginFormSchema) => {
      dispatch(loginThunk({ username, password }))
        .then(() => props.onComplete?.())
    }, [])


  return (
    <Box {...rootAttributes}>
      <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
        <div>
          <TextInput
            withAsterisk
            label="Админ"
            variant="filled"
            placeholder="example@gmail.com"
            {...form.getInputProps('username')}
          />
        </div>
        <div>
          <PasswordInput
            withAsterisk
            label="Пароль"
            variant="filled"
            placeholder="example"
            {...form.getInputProps('password')}
          />
        </div>
        <div className={css.actions}>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </Box>)
}
