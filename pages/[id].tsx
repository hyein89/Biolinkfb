import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import fs from "fs"
import path from "path"
import React from "react"

type LinkItem = {
  id: string
  title: string
  image_url?: string
}

type Props = {
  item: LinkItem
  absoluteImage?: string | null
}

const ALLOWED_ID_REGEX = /^[a-zA-Z0-9_-]+$/

/* SMALL SVG ICONS (inline) */
const Svg = {
  verified: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ verticalAlign: "middle", marginLeft: 6 }}>
      <path fill="currentColor" d="M12 2l2.3 3.9L18 7l-3 2.2.6 4L12 12l-3.6 1.2.6-4L6 7l3.8-.9L12 2z" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ verticalAlign: "middle", marginRight: 8 }}>
      <path fill="currentColor" d="M21 6.5a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 0 3 7v6.5A2.5 2.5 0 0 0 5.5 16H8v3l3.5-3H19a2 2 0 0 0 2-2V6.5z" />
    </svg>
  ),
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ verticalAlign: "middle", marginRight: 8 }}>
      <path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2z" />
    </svg>
  ),
  public: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ verticalAlign: "middle", marginRight: 8 }}>
      <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.5 0 3 .5 4 1.3L8.3 17A8 8 0 0112 4z" />
    </svg>
  ),
}

export default function LinkPage({ item, absoluteImage }: Props) {
  return (
    <>
      <Head>
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

        {/* Poppins (boleh dihapus kalau nggak mau Google fonts sama sekali) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* minimal styling — pindahkan ke globals.css kalau mau */}
      <style jsx>{`
        .container {
          max-width: 420px;
          margin: 40px auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          font-family: Poppins, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .avatar img {
          width: 96px;
          height: 96px;
          object-fit: cover;
          border-radius: 999px;
          display: block;
          margin-bottom: 12px;
        }
        .name {
          font-weight: 600;
          font-size: 20px;
          display: flex;
          align-items: center;
        }
        .bio { color: #444; margin: 10px 0 16px; }
        .buttons { display: flex; flex-direction: column; gap: 10px; }
        .button {
          display: inline-flex;
          align-items: center;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: white;
          font-weight: 600;
        }
        .wa { background: #25D366; }
        .tg { background: #0088cc; }
        .web { background: #4a5568; }
        .floating-btn {
          position: fixed;
          right: 14px;
          bottom: 14px;
          background: #ff385c;
          color: white;
          padding: 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
        }
      `}</style>

      {/* TEMPLATE */}
      <div className="container">
        <div className="avatar">
          {absoluteImage ? <img src={absoluteImage} alt={item.title} /> : null}
        </div>

        <div className="name">
          <span style={{ display: "inline-block" }}>{item.title}</span>
          {Svg.verified}
        </div>

        <p className="bio">
          Halo! Pilih media yang ingin kamu pakai untuk menghubungi saya.
        </p>

        <div className="buttons">
          <a className="button wa" href="#">
            {Svg.chat}
            <span>WhatsApp</span>
          </a>

          <a className="button tg" href="#">
            {Svg.send}
            <span>Telegram</span>
          </a>

          <a className="button web" href="#">
            {Svg.public}
            <span>Website</span>
          </a>
        </div>
      </div>

      <a href="#" className="floating-btn">
        ONLINE SEX CAMS
      </a>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataPath = path.join(process.cwd(), "data", "links.json")
  let items: LinkItem[] = []

  try {
    items = JSON.parse(fs.readFileSync(dataPath, "utf-8"))
  } catch (e) {
    items = []
  }

  const paths = items.map((it) => ({ params: { id: it.id } }))
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = String(ctx.params?.id || "")

  if (!ALLOWED_ID_REGEX.test(id)) {
    return { notFound: true }
  }

  const dataPath = path.join(process.cwd(), "data", "links.json")

  try {
    const raw = fs.readFileSync(dataPath, "utf-8")
    const items: LinkItem[] = JSON.parse(raw)
    const found = items.find((it) => it.id === id)

    if (!found) return { notFound: true }

    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tes.varcel.app"

    let absoluteImage: string | null = null
    if (found.image_url) {
      try {
        const url = new URL(found.image_url)
        if (url.protocol === "https:" || url.protocol === "http:") {
          absoluteImage = found.image_url
        }
      } catch {
        if (found.image_url.startsWith("/")) {
          absoluteImage = base + found.image_url
        }
      }
    }

    return { props: { item: found, absoluteImage }, revalidate: 30 }
  } catch {
    return { notFound: true }
  }
}
