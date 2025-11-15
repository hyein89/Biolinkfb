import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="notfound-wrapper">
        <div className="content">
          <h1 className="title">404</h1>
          <p className="subtitle">Oops... This page doesn’t exist.</p>
          <a href="/" className="home-btn">Go Back Home</a>
        </div>
      </main>

      <style jsx>{`
        .notfound-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
          animation: fadeIn 0.8s ease forwards;
        }

        .content {
          animation: float 3s ease-in-out infinite;
        }

        .title {
          font-size: 90px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -2px;
          color: #acd84d;
          animation: pop 0.7s ease forwards;
        }

        .subtitle {
          margin-top: 10px;
          font-size: 20px;
          color: #666;
          animation: fadeIn 1.2s ease forwards;
        }

        .home-btn {
          display: inline-block;
          margin-top: 25px;
          padding: 12px 26px;
          background: #acd84d;
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          transition: 0.25s ease;
        }

        .home-btn:hover {
          background: #98c23f;
          transform: translateY(-3px);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .title {
            font-size: 65px;
          }
          .subtitle {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  );
}
