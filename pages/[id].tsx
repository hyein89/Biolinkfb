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
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <title>{item.title}</title>
        <meta name="theme-color" content="#acd84d" />
        <meta name="description" content={item.title} />

        {/* OG TAG */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.title} />
        <meta property="og:site_name" content={item.title} />

        {absoluteImage && (
          <>
            <meta property="og:image" content={absoluteImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={absoluteImage} />
          </>
        )}

        <meta name="twitter:site" content="@" />
        <meta name="twitter:title" content={item.title} />
        <meta name="twitter:description" content={item.title} />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:domain" content="" />

        <link rel="icon" type="image/png" href="/2497746.png" />
        <link rel="canonical" href="" />

        {/* FONT (optional) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* BODY TEMPLATE */}
      <div className="container">
        <div className="avatar">
          <img src={absoluteImage ?? ""} alt={item.title} />
        </div>

        <div className="name">
          {item.title}{" "}
          <div className="material-icons pp-one">
            <img src="/verified.png" alt="verified" />
          </div>
        </div>

        <p className="bio">
          Halo! Pilih media yang ingin kamu pakai untuk menghubungi saya.
        </p>

        <div className="buttons">
          <a className="button wa">
            <div className="material-icons pp-one">
              <img src="/whatsapp.png" alt="WhatsApp" />
            </div>
            WhatsApp
          </a>

          <a className="button tg">
            <div className="material-icons pp-one">
              <img src="/telegram.png" alt="Telegram" />
            </div>
            Telegram
          </a>

          <a className="button web">
            <div className="material-icons pp-one">
              <img src="/web.png" alt="Website" />
            </div>
            Website xxxx18
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
