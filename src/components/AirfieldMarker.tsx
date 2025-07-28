import Image from 'next/image'
import clsx from 'clsx'

// Import all your images here and create a map
import HoldShortImage from '@/images/Marker_Hold-Short-Line.png'
import LocationMarkerImage from '@/images/Marker_Location-Marker.png'
import DistanceMarkerImage from '@/images/Marker_Runway-Distance-Marker.png'
import RunwaysImage from '@/images/Marker_Runway-Marker.png'
import RunwayWithTaxiImage from '@/images/Marker_Runway-Marker-w-Taxi.png'
import TaxiDirectionImage from '@/images/Marker_Direction-Signs.png'
import TaxiImage from '@/images/Marker_Location-Marker.png'

const imageMap = {
  'hold-short': HoldShortImage,
  'location-marker': LocationMarkerImage,
  'distance-marker': DistanceMarkerImage,
  'taxi-marker': TaxiImage,
  'runway-marker': RunwaysImage,
  'runway-with-taxi': RunwayWithTaxiImage,
  'direction-marker': TaxiDirectionImage,
} as const // Added 'as const' here

// Define a type for the image names based on imageMap keys
type ImageKey = keyof typeof imageMap

// Define the props interface for the AirfieldMarker component
interface AirfieldMarkerProps {
  image: ImageKey // 'image' must be one of the literal keys from imageMap
  className?: string // 'className' is an optional string
}

export function AirfieldMarker({ image, className }: AirfieldMarkerProps) {
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
