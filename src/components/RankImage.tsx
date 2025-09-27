// Static imports for all rank images
import Image from 'next/image'
import G0 from '@/images/ranks/G0.png'
import G1 from '@/images/ranks/G1.png'
import G2 from '@/images/ranks/G2.png'
import G3 from '@/images/ranks/G3.png'
import G4 from '@/images/ranks/G4.png'
import G5 from '@/images/ranks/G5.png'
import G6 from '@/images/ranks/G6.png'
import G7 from '@/images/ranks/G7.png'
import G8 from '@/images/ranks/G8.png'
import G9 from '@/images/ranks/G9.png'
import G10 from '@/images/ranks/G10.png'
import G11 from '@/images/ranks/G11.png'
import G12 from '@/images/ranks/G12.png'
import G13 from '@/images/ranks/G13.png'
import G14 from '@/images/ranks/G14.png'
import G15 from '@/images/ranks/G15.png'
import G16 from '@/images/ranks/G16.png'
import G17 from '@/images/ranks/G17.png'
import G18 from '@/images/ranks/G18.png'
import G19 from '@/images/ranks/G19.png'
import G20 from '@/images/ranks/G20.png'
import G21 from '@/images/ranks/G21.png'
import G22 from '@/images/ranks/G22.png'
import G23 from '@/images/ranks/G23.png'
import G24 from '@/images/ranks/G24.png'
import G25 from '@/images/ranks/G25.png'
import G26 from '@/images/ranks/G26.png'
import G27 from '@/images/ranks/G27.png'
import G28 from '@/images/ranks/G28.png'
import G29 from '@/images/ranks/G29.png'
import G30 from '@/images/ranks/G30.png'

import type { StaticImageData } from 'next/image'

const gradeImages: Record<string, StaticImageData> = {
  G0,
  G1,
  G2,
  G3,
  G4,
  G5,
  G6,
  G7,
  G8,
  G9,
  G10,
  G11,
  G12,
  G13,
  G14,
  G15,
  G16,
  G17,
  G18,
  G19,
  G20,
  G21,
  G22,
  G23,
  G24,
  G25,
  G26,
  G27,
  G28,
  G29,
  G30,
}

export function RankImage({
  grade,
  alt = '',
}: {
  grade: string
  alt?: string
}) {
  const src = gradeImages[grade]
  if (!src) {
    return <span>Unknown grade: {grade}</span>
  }
  return (
    <Image
      src={src}
      alt={alt || grade}
      title={alt || grade}
      style={{ maxWidth: '20%', height: '20%' }}
      placeholder="empty"
    />
  )
}
