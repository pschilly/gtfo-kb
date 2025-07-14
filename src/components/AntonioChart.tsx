import clsx from 'clsx'

import AntonioChartImage from '@/images/Antonio-Chart.jpg'
import Image from 'next/image'

export function AntonioChart() {
  return (
    <div>
      <Image
        src={AntonioChartImage}
        alt=""
        className="mx-auto w-auto shadow-2xl"
      />
    </div>
  )
}
