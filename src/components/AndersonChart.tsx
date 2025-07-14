import AndersonChartImage from '@/images/Anderson-Chart.jpg'
import Image from 'next/image'

export function AndersonChart() {
  return (
    <div>
      <Image
        src={AndersonChartImage}
        alt=""
        className="mx-auto w-auto shadow-2xl"
      />
    </div>
  )
}
