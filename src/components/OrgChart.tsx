import OrgChartImage from '@/images/GTFO-Org-Chart.png'
import Image from 'next/image'

export function OrgChart() {
  return (
    <div>
      <Image
        src={OrgChartImage}
        className="h-auto w-auto"
        alt="Global Task Force Overlord Organization Chart"
      />
    </div>
  )
}
