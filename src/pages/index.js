import Head from "next/head";
import Header from "@/components/site/header";
import Main from "@/components/site/Main";
import { Inter, Roboto_Mono, Manrope } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})
export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  return (
    <div className={`${manrope.className} h-screen text-quizlet-white`}>
      <Head>
        <title>Quizlet to JSON</title>
      </Head>
      <Header />
      <Main />
    </div>
  )
}
