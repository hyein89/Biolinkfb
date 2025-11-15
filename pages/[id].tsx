import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

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
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.title} />
        {absoluteImage ? (
          <>
            <meta property="og:image" content={absoluteImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={absoluteImage} />
          </>
        ) : (
          <meta name="twitter:card" content="summary" />
        )}
      </Head>

      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>{item.title}</h1>
          <p>ID: {item.id}</p>
          {absoluteImage ? <img src={absoluteImage} alt={item.title} style={{ maxWidth: 300 }} /> : null}
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Prebuild no pages or build all from data.json
  const dataPath = path.join(process.cwd(), 'data', 'links.json')
  let items: LinkItem[] = []
  try {
    items = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  } catch (e) {
    items = []
  }

  const paths = items.map((it) => ({ params: { id: it.id } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = String(ctx.params?.id || '')

  // Basic input validation — if ID contains unexpected chars, 404
  if (!ALLOWED_ID_REGEX.test(id)) {
    return { notFound: true }
  }

  const dataPath = path.join(process.cwd(), 'data', 'links.json')
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const items: LinkItem[] = JSON.parse(raw)
    const found = items.find((it) => it.id === id)
    if (!found) return { notFound: true }

    // Build absolute image url if provided and seems safe
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://tes.varcel.app'
    let absoluteImage: string | null = null
    if (found.image_url) {
      try {
        const url = new URL(found.image_url)
        // Only allow http(s) images
        if (url.protocol === 'https:' || url.protocol === 'http:') {
          absoluteImage = found.image_url
        }
      } catch (e) {
        // If image_url is relative path, resolve to base
        if (found.image_url.startsWith('/')) {
          absoluteImage = `${base}${found.image_url}`
        }
      }
    }

    return { props: { item: found, absoluteImage }, revalidate: 30 }
  } catch (e) {
    return { notFound: true }
  }
}
