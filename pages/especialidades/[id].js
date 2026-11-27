import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllIds, getData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getData('especialidades', params.id);

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
  const paths = await getAllIds('especialidades');

  return {
    paths,
    fallback: false,
  };
}

export default function Especialidad({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article className={utilStyles.backgroundC}>
        <p className={utilStyles.kicker}>Especialidades</p>
        <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>
        <h2 className={utilStyles.fieldLabel}>Name</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.especialidad_name || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Description</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.description || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Requirements</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.requirements || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Work environment</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.work_environment || '' }}
        />
      </article>
    </Layout>
  );
}
