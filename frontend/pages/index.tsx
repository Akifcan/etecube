import { FC } from 'react'
import Head from 'next/head'
import Container from '@/components/Container'

const Home: FC = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container header={{ title: 'Home', subtitle: 'Home Page' }} loginRequired={true}>
        <main>
        </main>
      </Container>

    </div>
  )
}

export default Home
