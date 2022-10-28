import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Linkstacks</title>
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
