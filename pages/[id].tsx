import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";

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

/**
 * ICON COMPONENT
 * - Jika font Material Symbols berhasil dimuat (fontLoaded = true), pakai span (font icon).
 * - Kalau belum, pakai SVG fallback yang selalu tampil.
 */
const Icon = ({ name, fontLoaded, className = "" }: { name: string; fontLoaded: boolean; className?: string }) => {
  const commonStyle = { verticalAlign: "middle", marginRight: 8, display: "inline-block" };

  const svgs: Record<string, JSX.Element> = {
    chat: (
      <svg width="18" height="18" viewBox="0 0 24 24" style={commonStyle} aria-hidden>
        <path d="M21 6.5a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 0 3 7v6.5A2.5 2.5 0 0 0 5.5 16H8v3l3.5-3H19a2 2 0 0 0 2-2V6.5z" fill="currentColor" />
      </svg>
    ),
    send: (
      <svg width="18" height="18" viewBox="0 0 24 24" style={commonStyle} aria-hidden>
        <path d="M2 21l21-9L2 3v7l15 2-15 2z" fill="currentColor" />
      </svg>
    ),
    public: (
      <svg width="18" height="18" viewBox="0 0 24 24" style={commonStyle} aria-hidden>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.5 0 3 .5 4 1.3L8.3 17A8 8 0 0112 4z" fill="currentColor" />
      </svg>
    ),
    verified: (
      <svg width="18" height="18" viewBox="0 0 24 24" style={commonStyle} aria-hidden>
        <path d="M12 2l2.3 3.9L18 7l-3 2.2.6 4L12 12l-3.6 1.2.6-4L6 7l3.8-.9L12 2z" fill="currentColor" />
      </svg>
    ),
  };

  if (fontLoaded) {
    return <span className={`material-symbols-rounded ${className}`}>{name}</span>;
  } else {
    return svgs[name] ?? null;
  }
};

export default function LinkPage({ item, absoluteImage }: Props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // 1) pastikan link font ada di head (tidak perlu ubah _app.tsx)
    const fontHref =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0&display=swap";

    // add preconnect if absent
    if (!document.querySelector(`link[href="https://fonts.googleapis.com"]`)) {
      const p1 = document.createElement("link");
      p1.rel = "preconnect";
      p1.href = "https://fonts.googleapis.com";
      document.head.appendChild(p1);
    }
    if (!document.querySelector(`link[href="https://fonts.gstatic.com"]`)) {
      const p2 = document.createElement("link");
      p2.rel = "preconnect";
      p2.href = "https://fonts.gstatic.com";
      p2.crossOrigin = "anonymous";
      document.head.appendChild(p2);
    }

    // add the stylesheet link if not present
    if (!document.querySelector(`link[href="${fontHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontHref;
      document.head.appendChild(link);
    }

    // 2) tunggu sampai browser memuat font via Font Loading API
    // coba load beberapa kali (kadang butuh waktu)
    let cancelled = false;

    async function waitFont() {
      try {
        // pertama, tunggu dokumen font ready (load request)
        // kita coba beberapa ukuran untuk memastikan variation axis nggak masalah
        await (document as any).fonts.load('20px "Material Symbols Rounded"');
        // ekstra delay kecil agar render update
        await new Promise((r) => setTimeout(r, 50));
        if (!cancelled) setFontLoaded(true);
      } catch (e) {
        // kalau error, tetap jangan crash — fontLoaded tetap false -> fallback SVG tampil
        if (!cancelled) setFontLoaded(false);
      }
    }

    waitFont();

    return () => {
      cancelled = true;
    };
  }, []); // run once client-side

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{item.title}</title>
        <meta name="description" content={item.title} />

        {/* OG TAG */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.title} />
        <meta name="theme-color" content="#acd84d" />
        {absoluteImage && (
          <>
            <meta property="og:image" content={absoluteImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={absoluteImage} />
          </>
        )}

        <link rel="icon" type="image/png" href="/2497746.png" />

        {/* Poppins tetap dimasukkan — untuk teks */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* NOTE: kita juga menambahkan font Material Symbols via effect di client (agar tidak perlu _app.tsx) */}
      </Head>

      {/* INLINE GLOBAL CSS (masukin ke globals.css kalau mau) */}
      <style jsx global>{`
        .material-symbols-rounded {
          font-family: "Material Symbols Rounded" !important;
          font-weight: normal;
          font-style: normal;
          font-size: 22px;
          line-height: 1;
          display: inline-block;
          -webkit-font-smoothing: antialiased;
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
        }

        /* helpers */
        .name .material-symbols-rounded {
          vertical-align: middle;
          margin-left: 6px;
        }
        .button .material-symbols-rounded {
          vertical-align: middle;
          margin-right: 8px;
        }
      `}</style>

      {/* TEMPLATE */}
      <div className="container">
        <div className="avatar">{absoluteImage ? <img src={absoluteImage} alt={item.title} /> : null}</div>

        <div className="name">
          {item.title} <Icon name="verified" fontLoaded={fontLoaded} />
        </div>

        <p className="bio">Halo! Pilih media yang ingin kamu pakai untuk menghubungi saya.</p>

        <div className="buttons">
          <a className="button wa" href="#">
            <Icon name="chat" fontLoaded={fontLoaded} /> WhatsApp
          </a>

          <a className="button tg" href="#">
            <Icon name="send" fontLoaded={fontLoaded} /> Telegram
          </a>

          <a className="button web" href="#">
            <Icon name="public" fontLoaded={fontLoaded} /> Website
          </a>
        </div>
      </div>

      <a href="#" className="floating-btn">
        ONLINE SEX CAMS
      </a>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataPath = path.join(process.cwd(), "data", "links.json");
  let items: LinkItem[] = [];

  try {
    items = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  } catch (e) {
    items = [];
  }

  const paths = items.map((it) => ({ params: { id: it.id } }));
  return { paths, fallback: "blocking" };
};

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

    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tes.varcel.app";

    let absoluteImage: string | null = null;
    if (found.image_url) {
      try {
        const url = new URL(found.image_url);
        if (url.protocol === "https:" || url.protocol === "http:") {
          absoluteImage = found.image_url;
        }
      } catch {
        if (found.image_url.startsWith("/")) {
          absoluteImage = base + found.image_url;
        }
      }
    }

    return { props: { item: found, absoluteImage }, revalidate: 30 };
  } catch {
    return { notFound: true };
  }
};
