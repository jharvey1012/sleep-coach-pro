import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout/Layout';
import Footer from '../components/Footer/Footer';
import ClientList from '../components/ClientList/ClientList';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Eight Sleep Sleep Coach Pro!
          </h1>
          <p>The premier app for helping your clients improve their sleep</p>
        <ClientList />
        </main>
        <Footer />
      </div>
    </Layout>
  )
}

export default Home
