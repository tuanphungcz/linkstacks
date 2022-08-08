import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
