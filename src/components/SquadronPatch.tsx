import Image from 'next/image'
import clsx from 'clsx'

// Import all your images here and create a map
import Thumb_507th from '@/images/squadron-patches/507th-thumb.png'
//import x from '@/images/.png'

const imageMap = {
  '507th_thumb': Thumb_507th,
  //'': ,
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
