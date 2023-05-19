import Head from 'next/head'
import { LayoutMain } from '@widgets/LayoutMain';
import { useAppSelector } from '@shared/model';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LayoutSources } from '@widgets/LayoutSources';

export default function Home() {

  const isAuth = useAppSelector(({ session }) => session.isAuthorized)
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login")
    }
  }, [isAuth])


  return <>
    <Head>
      <title>Prospero</title>
      <meta name="description" content="news aggregator" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icon.svg" />
    </Head>
    <LayoutMain>
      <LayoutSources />
    </LayoutMain>
  </>
}
