import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllIds, getData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getData('medicos', params.id);

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
  const paths = await getAllIds('medicos');

  return {
    paths,
    fallback: false,
  };
}

export default function Medico({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article className={utilStyles.backgroundC}>
        <p className={utilStyles.kicker}>Medicos</p>
        <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>
        <h2 className={utilStyles.fieldLabel}>Name</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.doctor_name || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Specialty</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.specialty || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Education</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.education || '' }}
        />
        <h2 className={utilStyles.fieldLabel}>Years of experience</h2>
        <div
          className={utilStyles.lightText}
          dangerouslySetInnerHTML={{ __html: postData.years_of_experience || '' }}
        />
      </article>
    </Layout>
  );
}
