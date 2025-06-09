import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <link rel="preload" href="/fonts/IRANSansX-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IRANSansX-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <style>{`
          @font-face {
            font-family: 'IRANSansX';
            src: url('/fonts/IRANSansX-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: 'IRANSansX';
            src: url('/fonts/IRANSansX-Bold.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
          }
          body {
            font-family: 'IRANSansX', sans-serif;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}