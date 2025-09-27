import { Callout } from '@/components/Callout'
import { AntonioChart } from '@/components/AntonioChart'
import { AndersonChart } from '@/components/AndersonChart'
import { FixedWingBCFRouteChart } from '@/components/FixedWingBCFRouteChart'
import { OrgChart } from '@/components/OrgChart'
import { AirfieldMarker } from '@/components/AirfieldMarker'
import { AirfieldTrafficPattern } from '@/components/AirfieldTrafficPattern'

import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { RankImage } from '@/components/RankImage'

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
  orgchart: {
    render: OrgChart,
  },
  airfieldpattern: {
    render: AirfieldTrafficPattern,
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
  airfieldmarker: {
    render: AirfieldMarker,
    attributes: {
      image: {
        type: String,
        required: true,
        description: 'The name of the image to display (e.g., "image-a").',
      },
      className: {
        // New attribute for class names
        type: String,
        description:
          'Additional CSS classes to apply to the image, e.g., "w-1/2".',
      },
    },
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
  'rank-image': {
    render: RankImage,
    attributes: {
      grade: { type: String },
    },
  },
}

export default tags
