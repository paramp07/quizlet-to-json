import Head from "next/head";
import Header from "../components/site/Header";
import Main from "../components/site/Main";
import { Inter, Roboto_Mono, Manrope } from 'next/font/google'
import { DefaultSeo, NextSeo } from 'next-seo';

export const inter = Inter({ subsets: ['latin'], display: 'swap' });
export const roboto_mono = Roboto_Mono({ subsets: ['latin'], display: 'swap' });
export const manrope = Manrope({ subsets: ['latin'], display: 'swap' });

export default function Home() {
  const seoData = {
    title: 'Quizlet to JSON',
    description: 'Convert your Quizlet sets to JSON format.',
    canonical: 'https://quizlet-to-json.vercel.app/',
    openGraph: {
      url: 'https://quizlet-to-json.vercel.app/',
      title: 'Quizlet to JSON',
      description: 'Convert your Quizlet sets to JSON format.',
      site_name: 'Quizlet to JSON',
    },
    twitter: {
      handle: '@your-twitter-handle',
      site: '@your-twitter-handle',
      cardType: 'summary_large_image',
    },
  };

  return (
    <div className={`${manrope.className} h-screen text-quizlet-white`}>
      <DefaultSeo {...seoData} />
      <NextSeo {...seoData} />
      <Head>
        <meta name="google-site-verification" content="EgrlpsE3eQVqZY9UMz6TLwCUrgYRLVAUv0RMv3aQgio" />
        <title>Quizlet to JSON</title>
      </Head>
      <Header />
      <Main />
    </div>
  );
}