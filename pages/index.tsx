import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple Bio Link</title>
        
        {/* Added Meta Tags */}
        <meta name="description" content="Simple Bio Link — Create your micro landing page with custom branding and unlimited smart links." />
        <meta property="og:title" content="Simple Bio Link" />
        <meta property="og:description" content="Build your own micro-website and showcase your links with style." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="notfoundWrapper">
        <div className="container content">

          <h1 className="title">Simple Bio Link</h1>

          <p className="subtitle">
            Build your own micro-website and show off what you're about. Bundle up URLs to anything and everything that's unique to you, customise your branding & imagery, and track valuable engagement. Get started and create unlimited Smart Links for free.
          </p>

          <a href="https://lnk.bio/?ref=-2207912" className="homeBtn">
            Create Your Free Smart Link
          </a>
        </div>

        {/* Bottom Image Section */}
        <div className="bottomImageWrapper">
          <img src="/smart-links-static-landing.png" alt="Sports Banner" className="bottomImage" />
        </div>
      </main>

      <style jsx>{`
        .bottomImageWrapper {
          width: 100%;
          margin-top: -120px;
        }

        .bottomImage {
          width: 100%;
          
          display: block;
        }
      `}</style>
    </>
  );
}
