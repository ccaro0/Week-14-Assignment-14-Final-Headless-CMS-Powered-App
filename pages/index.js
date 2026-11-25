import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/posts';

export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: {
      allData
    }
  }
}
export default function Home({ allData }) {
  return (
      <Layout home>
        <Head>
          <title>List of Names</title>
        </Head>
        <h1>List of Especialidades</h1>
        <ol className="list-group">
          {allData.map(({ id, name }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
              {name}
            </Link>
            </li>
          ))}
        </ol>
      </Layout>
  );
}