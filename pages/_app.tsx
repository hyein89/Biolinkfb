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
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* ================= HISTATS ==================== */}
      <Script id="histats" strategy="afterInteractive">
        {`
          window._Hasync = window._Hasync || [];
          window._Hasync.push(['Histats.start', '4828760', '4', '0', '0', '0']);
          window._Hasync.push(['Histats.fasi', '1']);
          window._Hasync.push(['Histats.track_hits', '']);

          function loadHistats() {
            var hs = document.createElement('script');
            hs.type = 'text/javascript';
            hs.async = true;
            hs.src = 'https://s10.histats.com/js15_as.js';
            document.body.appendChild(hs);
          }

          if (document.readyState === 'complete') {
            loadHistats();
          } else {
            window.addEventListener('load', loadHistats);
          }
        `}
      </Script>

      <noscript>
        <a href="/" target="_blank">
          <img
            src="https://sstatic1.histats.com/0.gif?4828760&101"
            alt="histats"
          />
        </a>
      </noscript>
      {/* =============== END HISTATS ================= */}

      <Component {...pageProps} />
    </>
  )
}
