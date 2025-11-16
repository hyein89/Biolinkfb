import type { AppProps } from 'next/app'
import Head from 'next/head'
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

      {/* HISTATS IFRAME */}
      <iframe
        src="/histats.html"
        style={{
          width: 0,
          height: 0,
          border: 'none',
          position: 'absolute',
          visibility: 'hidden'
        }}
      />

      <Component {...pageProps} />
    </>
  )
}
