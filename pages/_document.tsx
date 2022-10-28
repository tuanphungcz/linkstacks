import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="An open source about.me like application built using Next.js 13 and Stacks.js."
        />
        <meta property="og:url" content="https://linkstacks.vercel.app" key="ogurl" />
        <meta property="og:image" content="https://linkstacks.vercel.app/preview.png" key="ogimage" />
        <meta property="og:site_name" content="Linkstacks" key="ogsitename" />
        <meta property="og:title" content="Linkstacks.verlce.app" key="ogtitle" />
        <meta property="og:description" content="An open source about.me like application built using Next.js 13 and Stacks.js." key="ogdesc" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
