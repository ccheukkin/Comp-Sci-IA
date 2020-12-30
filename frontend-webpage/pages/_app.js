import '../styles/globals.css'
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Head>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <title>QueCat</title>
    </Head>
    <Component {...pageProps} />
    </>
  );
}

export default MyApp
