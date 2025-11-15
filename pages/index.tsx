import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>tes.varcel.app</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Blank/placeholder main page per request */}
        <div style={{ textAlign: 'center', opacity: 0.6 }}>
          <p>tes.varcel.app</p>
        </div>
      </main>
    </>
  )
}
