import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  const especialidades = await getSortedList('especialidades');
  const medicos = await getSortedList('medicos');
  const servicios = await getSortedList('servicios');

  return {
    props: {
      especialidades,
      medicos,
      servicios,
    },
    revalidate: 60,
  };
}

export default function Home({ especialidades, medicos, servicios }) {
  return (
    <Layout home>
      <Head>
        <title>Care Directory</title>
      </Head>
      <p className={utilStyles.intro}>
        Specialties, doctors, and services published from the clinic site.
      </p>
      <section id="especialidades" className={utilStyles.section}>
        <h2 className={utilStyles.headingLg}>Especialidades</h2>
        <ul className={utilStyles.list}>
          {especialidades.map(({ id, name }) => (
            <li key={id} className={utilStyles.listItem}>
              <Link href={`/especialidades/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="medicos" className={utilStyles.section}>
        <h2 className={utilStyles.headingLg}>Medicos</h2>
        <ul className={utilStyles.list}>
          {medicos.map(({ id, name }) => (
            <li key={id} className={utilStyles.listItem}>
              <Link href={`/medicos/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="servicios" className={utilStyles.section}>
        <h2 className={utilStyles.headingLg}>Servicios</h2>
        <ul className={utilStyles.list}>
          {servicios.map(({ id, name }) => (
            <li key={id} className={utilStyles.listItem}>
              <Link href={`/servicios/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
