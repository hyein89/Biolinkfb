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
        <title>{item.title}</title>
        <meta name="description" content={item.title} />

        {/* OG TAG */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.title} />
        {absoluteImage && (
          <>
            <meta property="og:image" content={absoluteImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={absoluteImage} />
          </>
        )}

        <link rel="icon" type="image/png" href="/2497746.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      {/* --- TEMPLATE HTML LO, DIUBAH KE JSX --- */}
      <div className="container">
        <div className="avatar">
          <img src={absoluteImage}/>
        </div>

        <div className="name">
          {item.title} <span className="material-icons">verified</span>
        </div>

        <p className="bio">
          Halo! Pilih media yang ingin kamu pakai untuk menghubungi saya.
        </p>

        <div className="buttons">
          <a className="button wa">
            <span className="material-icons">chat</span> WhatsApp
          </a>

          <a className="button tg">
            <span className="material-icons">send</span> Telegram
          </a>

          <a className="button web">
            <span className="material-icons">public</span> Website
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
