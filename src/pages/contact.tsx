import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'
import Sparkle from '../components/svgs/sparkle'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: null, // Disabled
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: null, // Disabled
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: null, // Disabled
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:turboaitech@gmail.com?subject=Contact from Blog',
  },
]

export default function Contact() {
  return (
    <>
      <Header titlePre="Contact" />
      <div className={sharedStyles.layout}>
        <div className={contactStyles.avatar}>
          <Sparkle height={60} />
        </div>

        <h1 style={{ marginTop: 0 }}>Contact</h1>

        <div className={contactStyles.name}>Contact: turboaitech@gmail.com</div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }, index) => {
            return link ? (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            ) : (
              <div
                key={index}
                style={{ opacity: 0.5, cursor: 'default' }}
                aria-label={alt}
              >
                <Comp height={32} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
