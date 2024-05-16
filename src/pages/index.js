import Head from "next/head";
import Header from "@/components/site/header";
import Main from "@/components/site/Main";

export default function Home() {
  return (
    <div className="h-screen  text-quizlet-white">
      <Head>
        <title>Quizlet to JSON</title>
      </Head>
      <Header />
      <Main />
    </div>
  );
}
