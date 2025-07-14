import { Callout } from '@/components/Callout'
import { AntonioChart } from '@/components/AntonioChart'
import { AndersonChart } from '@/components/AndersonChart'
import { FixedWingBCFRouteChart } from '@/components/FixedWingBCFRouteChart'

import { QuickLink, QuickLinks } from '@/components/QuickLinks'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  antoniochart: {
    render: AntonioChart,
  },
  andersonchart: {
    render: AndersonChart,
  },
  fwbcfroute: {
    render: FixedWingBCFRouteChart,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
}

export default tags
