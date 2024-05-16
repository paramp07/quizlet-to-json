import Head from "next/head";
import Header from "../components/site/Header";
import Main from "../components/site/Main";
import { Inter, Roboto_Mono, Manrope } from "next/font/google";
import { DefaultSeo, NextSeo } from "next-seo";

export const inter = Inter({ subsets: ["latin"], display: "swap" });
export const roboto_mono = Roboto_Mono({ subsets: ["latin"], display: "swap" });
export const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export default function Home() {
  const seoData = {
    title: "Quizlet to JSON",
    description: "Convert your Quizlet sets to JSON format.",
    canonical: "https://quizlet-to-json.vercel.app/",
    openGraph: {
      url: "https://quizlet-to-json.vercel.app/",
      title: "Quizlet to JSON",
      description: "Convert your Quizlet sets to JSON format.",
      site_name: "Quizlet to JSON",
    },
    twitter: {
      handle: "@your-twitter-handle",
      site: "@your-twitter-handle",
      cardType: "summary_large_image",
    },
  };

  return (
    <div className={`${manrope.className} h-screen text-quizlet-white`}>
      <DefaultSeo {...seoData} />
      <NextSeo {...seoData} />
      <Head>
        <meta
          name="google-site-verification"
          content="EgrlpsE3eQVqZY9UMz6TLwCUrgYRLVAUv0RMv3aQgio"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-6710100518502375"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6710100518502375"
          crossorigin="anonymous"
        ></script>
        <title>Quizlet to JSON</title>
      </Head>
      <Header />
      <Main />
      <footer className="max-w-4xl mx-auto text-sm px-6 py-14 space-y-2">
        <p className="text-lg font-bold">Disclaimer</p>
        <p>This website is not affiliated with or endorsed by Quizlet.</p>
        <p>
          Our use of the name &ldquo;Quizlet&rdquo; is for context, not claiming any
          ownership. It remains the property of the copyright holder.
        </p>
        <p>
          quizlet-to-json.vercel.app doesn&apos;t host any copyrighted material.
          We utilize third-party services to accomplish our goals.
        </p>
        <p className="text-lg">© 2024 quizlet-to-json.vercel.app</p>
      </footer>
    </div>
  );
}
