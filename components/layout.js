import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export const siteTitle = 'Care Directory';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Specialties, doctors, and services from the clinic WordPress site"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home && <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>}
        <nav className={styles.nav} aria-label="Post types">
          <Link href="/#especialidades">Especialidades</Link>
          <Link href="/#medicos">Medicos</Link>
          <Link href="/#servicios">Servicios</Link>
        </nav>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
