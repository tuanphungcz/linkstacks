import useLogRocket from 'hooks/useLogrocket';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';

export default function App({ Component, pageProps }: any) {
  useLogRocket();

  return (
    <>
      <Head>
        <title>LinkStacks</title>
        {process.env.NEXT_PUBLIC_UMAMI_ID && (
          <script
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            src="https://umami-nu.vercel.app/umami.js"
          />
        )}
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
