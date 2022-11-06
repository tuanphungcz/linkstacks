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
        <meta property="og:url" content="https://linkstacks.xyz" key="ogurl" />
        <meta
          property="og:image"
          content="https://linkstacks.xyz/preview.png"
          key="ogimage"
        />
        <meta property="og:site_name" content="Linkstacks" key="ogsitename" />
        <meta property="og:title" content="Linkstacks.xyz" key="ogtitle" />
        <meta
          property="og:description"
          content="An open source about.me like application built using Next.js 13 and Stacks.js."
          key="ogdesc"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="linkstacks.xyz" />
        <meta name="twitter:title" content="linkstacks.xyz" />
        <meta
          name="twitter:description"
          content="An open source about.me like application built using Next.js 13 and Stacks.js."
        />
        <meta name="twitter:creator" content="@Gr8087" />
        <meta property="og:url" content="https://linkstacks.xyz" />
        <meta name="twitter:image" content="https://linkstacks.xyz/preview.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
