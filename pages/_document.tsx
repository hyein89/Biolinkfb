import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* HISTATS FIX — LOAD DI HEAD HTML LANGSUNG */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _Hasync = _Hasync || [];
              _Hasync.push(['Histats.start', '1,4828760,4,0,0,0,00010000']);
              _Hasync.push(['Histats.fasi', '1']);
              _Hasync.push(['Histats.track_hits','']);
              (function() {
                var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
                hs.src = ('//s10.histats.com/js15_as.js');
                (document.head).appendChild(hs);
              })();
            `,
          }}
        ></script>

        <noscript>
          <a href="/" target="_blank">
            <img src="//sstatic1.histats.com/0.gif?4828760&101" alt="histats" />
          </a>
        </noscript>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
