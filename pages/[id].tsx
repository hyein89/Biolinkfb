"use client";
import LINKS from "../config/links";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import Script from "next/script";
// ========================
// TYPE
// ========================
type LinkItem = {
  id: string;
  title: string;
  image_url?: string;
};

type Props = {
  item: LinkItem;
  absoluteImage?: string | null;
};

const ALLOWED_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

export default function LinkPage({ item, absoluteImage }: Props) {
  // BASE URL
  const RAW_BASE =
    process.env.NEXT_PUBLIC_BASE_URL || "https://tes.vercel.app";
  const BASE = RAW_BASE.replace(/\/+$/, "");

  // OFFERS / LINKS DARI ENV (BENAR)
  const OFFER = LINKS.OFFER;
  const WA = LINKS.WHATSAPP;
  const TG = LINKS.TELEGRAM;
  const WEB = LINKS.WEBSITE;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <title>{item.title}</title>
        <meta name="description" content={item.title} />
        <meta name="theme-color" content="#acd84d" />

        {/* OG */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.title} />
        <meta property="og:url" content={`${BASE}/${item.id}`} />

        {absoluteImage && (
          <>
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:image:secure_url" content={absoluteImage} />
          </>
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={item.title} />
        <meta name="twitter:description" content={item.title} />
        <meta
          name="twitter:image"
          content={absoluteImage || `${BASE}/og-default.png`}
        />

        <link rel="canonical" href={`${BASE}/${item.id}`} />
        <link rel="icon" type="image/png" href="/2497746.png" />

        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>

{/* HISTATS */}
      <Script id="histats" strategy="afterInteractive">
        {`
          var _Hasync = _Hasync || [];
          _Hasync.push(['Histats.start', '1,4828760,4,0,0,0,00010000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          (function() {
            var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
            hs.src = ('//s10.histats.com/js15_as.js');
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
          })();
        `}
      </Script>

      <noscript>
        <a href="/" target="_blank">
          <img src="//sstatic1.histats.com/0.gif?4828760&101" alt="" />
        </a>
      </noscript>
      
      {/* BODY */}
      <div className="container">
        <div className="avatar">
          <img src={absoluteImage ?? "/og-default.png"} alt={item.title} />
        </div>

        <div className="name">
          {item.title}
          <div className="material-icons pp-one">
            <img src="/verified.png" alt="verified" />
          </div>
        </div>

        <p className="bio">
          Want something different tonight? 🔥 Try clicking the button below. Who knows, it might just be the right fit.
        </p>

        <div className="buttons">
          <a className="button wa" href={WA} target="_blank">
            <div className="material-icons pp-one">
              <img src="/whatsapp.png" alt="WhatsApp" />
            </div>
            WhatsApp
          </a>

          <a className="button tg" href={TG} target="_blank">
            <div className="material-icons pp-one">
              <img src="/telegram.png" alt="Telegram" />
            </div>
            Telegram
          </a>

          <a className="button web" href={WEB} target="_blank">
            <div className="material-icons pp-one">
              <img src="/web.png" alt="Website" />
            </div>
            Content(+18)
          </a>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <a href={OFFER} className="floating-btn" target="_blank">
        ONLINE SEX CAMS
      </a>
    </>
  );
}

// =========================================================
// STATIC PATHS
// =========================================================
export const getStaticPaths: GetStaticPaths = async () => {
  const dataPath = path.join(process.cwd(), "data", "links.json");
  let items: LinkItem[] = [];

  try {
    items = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  } catch {
    items = [];
  }

  const paths = items.map((it) => ({ params: { id: it.id } }));
  return { paths, fallback: "blocking" };
};

// =========================================================
// STATIC PROPS
// =========================================================
export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = String(ctx.params?.id || "");

  if (!ALLOWED_ID_REGEX.test(id)) {
    return { notFound: true };
  }

  const dataPath = path.join(process.cwd(), "data", "links.json");

  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    const items: LinkItem[] = JSON.parse(raw);
    const found = items.find((it) => it.id === id);
    if (!found) return { notFound: true };

    const rawBase =
      process.env.NEXT_PUBLIC_BASE_URL || "https://tes.vercel.app";
    const BASE = rawBase.replace(/\/+$/, "");

    let absoluteImage: string | null = null;

    if (found.image_url) {
      try {
        new URL(found.image_url);
        absoluteImage = found.image_url;
      } catch {
        absoluteImage = `${BASE}/${found.image_url.replace(/^\/+/, "")}`;
      }
    }

    if (!absoluteImage) {
      absoluteImage = `${BASE}/og-default.png`;
    }

    return { props: { item: found, absoluteImage }, revalidate: 30 };
  } catch {
    return { notFound: true };
  }
};
