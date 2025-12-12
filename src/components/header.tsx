import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'Contact', page: '/contact' },
]

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
const ogImageUrl = `${SITE_URL}/og-image.png`

interface HeaderProps {
  titlePre?: string
  description?: string
  ogImage?: string
}

const Header = ({
  titlePre = '',
  description = 'Company Blog - Insights, articles, and updates',
  ogImage = ogImageUrl
}: HeaderProps) => {
  const { pathname, asPath } = useRouter()
  const pageTitle = titlePre ? `${titlePre} | Company Blog` : 'Company Blog'
  const canonicalUrl = `${SITE_URL}${asPath.split('?')[0]}`

  // JSON-LD structured data for the website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Company Blog',
    description: description,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // JSON-LD structured data for the organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Company Blog',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/yourcompany',
      // 'https://linkedin.com/company/yourcompany',
    ],
  }

  return (
    <header className={styles.header}>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Company Blog" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Company Blog" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Company Blog RSS Feed"
          href={`${SITE_URL}/atom`}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
