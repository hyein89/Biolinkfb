import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Not found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      </main>
    </>
  )
}
