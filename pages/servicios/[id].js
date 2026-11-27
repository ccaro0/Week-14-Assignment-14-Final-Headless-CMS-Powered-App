import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllIds, getData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getData('servicios', params.id);

  if (!postData) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      postData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds('servicios');

  return {
    paths,
    fallback: false,
  };
}

export default function Servicio({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article className={utilStyles.backgroundC}>
        <p className={utilStyles.kicker}>Servicios</p>
        <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>
        <h2 className={utilStyles.fieldLabel}>Name</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.service_name || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Description</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.description || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Cost</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.cost || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Duration</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.duration || '' }}
        />
      </article>
    </Layout>
  );
}
