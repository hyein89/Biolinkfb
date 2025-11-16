import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/2497746.png" />
        <meta name="theme-color" content="#acd84d" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* === Tambahkan Histats di sini === */}
      <Script id="histats-script" strategy="afterInteractive">
        {`
          var _Hasync = _Hasync || [];
          _Hasync.push(['Histats.start', '1,4828760,4,0,0,0,00010000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          (function() {
            var hs = document.createElement('script'); 
            hs.type = 'text/javascript'; 
            hs.async = true;
            hs.src = 'https://s10.histats.com/js15_as.js';
            (document.getElementsByTagName('head')[0] || document.body).appendChild(hs);
          })();
        `}
      </Script>
      {/* === END Histats === */}

      <Component {...pageProps} />
    </>
  )
}
