import clsx from 'clsx'

import FixedWingBCFRouteChartImage from '@/images/fixed-wing-bcf-route.png'
import Image from 'next/image'

export function FixedWingBCFRouteChart() {
  return (
    <div>
      <Image
        src={FixedWingBCFRouteChartImage}
        alt=""
        className="mx-auto w-auto shadow-2xl"
      />
    </div>
  )
}
