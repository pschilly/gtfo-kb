import OrgChartImage from '@/images/GTFO-Org-Chart.png'
import Image from 'next/image'

export function OrgChart() {
  return (
    <div>
      <Image
        src={OrgChartImage}
        className="mx-auto h-auto w-3/4"
        alt="Global Task Force Overlord Organization Chart"
      />
    </div>
  )
}
