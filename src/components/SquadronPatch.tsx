import Image from 'next/image'
import clsx from 'clsx'

// Import all your images here and create a map
import Thumb_19th  from '@/images/squadron-patches/19thAAB-thumb.png'
import Thumb_62nd  from '@/images/squadron-patches/62nd-thumb.png'
import Thumb_449th from '@/images/squadron-patches/449th-TFS-thumb.png'
import Thumb_479th from '@/images/squadron-patches/479th_Patch-thumb.png'
import Thumb_507th from '@/images/squadron-patches/507th-thumb.png'
import Thumb_vf141 from '@/images/squadron-patches/VFA-141-thumb.png'

const imageMap = {
  '19th_thumb':  Thumb_19th,
  '62nd_thumb':  Thumb_62nd,
  '449th_thumb': Thumb_449th,
  '479th_thumb': Thumb_479th,
  '507th_thumb': Thumb_507th,
  'vf141_thumb': Thumb_vf141,
} as const // Added 'as const' here

// Define a type for the image names based on imageMap keys
type ImageKey = keyof typeof imageMap

// Define the props interface for the SquadronPatch component
interface SquadronPatchProps {
  image: ImageKey // 'image' must be one of the literal keys from imageMap
  className?: string // 'className' is an optional string
}

export function SquadronPatch({ image, className }: SquadronPatchProps) {
  const selectedImage = imageMap[image]

  if (!selectedImage) {
    // This console.warn acts as a fallback for defensive programming,
    // though TypeScript should prevent invalid 'image' values at compile time.
    console.warn(`Image "${image}" not found in imageMap.`)
    return null // Or render a placeholder/error message
  }

  return (
    <div>
      <Image
        src={selectedImage}
        alt="" // Consider adding a more descriptive alt text for accessibility
        className={clsx('mx-auto shadow-2xl', className)} // Merge class names
      />
    </div>
  )
}
