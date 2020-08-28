import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar">
        <p className="span">
            <a href="/">Home</a>
        </p>
        <p className="span">
            <a href="/game">Play</a>
        </p>
      </nav>
      <main className={styles.main}>
        <h1 className={styles.title}>
          About
        </h1>
        <div className={styles.grid}>
            <p className={styles.description}>
                The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1] It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
            </p>
        </div>
        
      </main>

      <footer className={styles.footer}>
        <p>A Project by Oliver Abreu</p>
      </footer>
    </div>
  )
}
