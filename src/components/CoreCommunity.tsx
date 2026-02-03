import CoreCommunityImage from '@/images/Two_Tier_Roster_Promo_Image.jpg'
import Image from 'next/image'

export function CoreCommunity() {
  return (
    <div>
      <Image
        src={CoreCommunityImage}
        className="mx-auto h-auto"
        alt="GTFO Core vs Community Roster Structure"
      />
    </div>
  )
}
