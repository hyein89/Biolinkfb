import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="notfoundWrapper">
        <div className="container content">

          <h1 className="title">404</h1>

          <p className="subtitle">
            Oops... This page doesn’t exist.
          </p>

          <a href="/" className="homeBtn">
            Go Back Home
          </a>

        </div>
      </main>
    </>
  );
}
