import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          J.H. Conway&apos;s Game of Life
        </h1>

        <p className={styles.description}>
          Statically rendered using{' '}
          <code className={styles.code}><a href="https://nextjs.org/">NextJS</a></code>
        </p>

        <div className={styles.grid}>
          
          <a
            href="/about"
            className={styles.card}
          >
            <h3>Learn More &rarr;</h3>
            <p>Discover the history of this cellular automata.</p>
          </a>

          <a
            href="/game"
            className={styles.card}
          >
            <h3>Play Now &rarr;</h3>
            <p>
              Play this 'zero-player' game in your browser!
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>A Project by Oliver Abreu</p>
      </footer>
    </div>
  )
}
