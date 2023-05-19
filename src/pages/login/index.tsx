import { useCallback } from 'react'
import { LoginForm } from '@features/authentication/Login'
import { useRouter } from 'next/router';
import { LayoutMain } from '@widgets/LayoutMain';
import { Card, Center, Container } from '@mantine/core';
import { useAppSelector } from '@shared/model';


export default function LoginPage() {
  const router = useRouter()
  const onComplete = useCallback(() => {
    console.log("onComplete useCallback");
    router.push('/')
  }, [router.pathname])

  const isAuth = useAppSelector(({ session }) => session.isAuthorized)
  if (isAuth) {
    router.push("/")
  }

  return <LayoutMain>
    <Center h={"80vh"}>
      <Container size="30rem" px={0}>
        <Card withBorder radius="md" p="md">

          <h1>Точка входа</h1>
          <p>
            Используйте {"mskKote"} / {"qwerty"} как тестового пользователя
          </p>

          <LoginForm onComplete={onComplete} />
        </Card>
      </Container>
    </Center>
  </LayoutMain>
}
