import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import fs from "fs"
import path from "path"

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

export default function LinkPage({ item, absoluteImage }: Props) {
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

        {/* FONT POPPINS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* MATERIAL SYMBOLS — include variable axes so glyphs render */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* GLOBAL CSS FOR ICONS (pindahkan ke globals.css jika mau) */}
      <style jsx global>{`
        /* ensure the material symbol font is used and the right variation settings */
        .material-symbols-rounded {
          font-family: 'Material Symbols Rounded';
          font-weight: 400;
          font-style: normal;
          font-size: 20px; /* sesuaikan kebutuhan */
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
          /* IMPORTANT: set variation axes so it renders icons, bukan huruf */
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
        }

        /* optional alignment tweaks */
        .name .material-symbols-rounded { vertical-align: middle; margin-left: 6px; }
        .button .material-symbols-rounded { vertical-align: middle; margin-right: 8px; }

        /* avoid overriding by any global * selector - keep specificity */
      `}</style>

      {/* TEMPLATE */}
      <div className="container">
        <div className="avatar">
          {/* kalau absoluteImage = null, lebih baik sembunyikan img atau beri placeholder */}
          {absoluteImage ? <img src={absoluteImage} alt={item.title} /> : null}
        </div>

        <div className="name">
          {item.title} <span className="material-symbols-rounded">verified</span>
        </div>

        <p className="bio">
          Halo! Pilih media yang ingin kamu pakai untuk menghubungi saya.
        </p>

        <div className="buttons">
          <a className="button wa" href="#">
            <span className="material-symbols-rounded">chat</span> WhatsApp
          </a>

          <a className="button tg" href="#">
            <span className="material-symbols-rounded">send</span> Telegram
          </a>

          <a className="button web" href="#">
            <span className="material-symbols-rounded">public</span> Website
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
