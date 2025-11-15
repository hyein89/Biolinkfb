import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className={styles.notfoundWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>Oops... This page doesn’t exist.</p>
          <a href="/" className={styles.homeBtn}>Go Back Home</a>
        </div>
      </main>
    </>
  );
}
