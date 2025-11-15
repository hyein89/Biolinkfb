import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="notfoundWrapper">
        <div className="container content">

          <h1 className="title">Simple Bio Link</h1>

          <p className="subtitle">
            Build your own micro-website and show off what you're about. Bundle up URLs to anything and everything that's unique to you, customise your branding & imagery, and track valuable engagement. Get started and create unlimited Smart Links for free.
          </p>

          <a href="/" className="homeBtn">
            Create Your Free Smart Link
          </a>

        </div>
      </main>
    </>
  );
}
