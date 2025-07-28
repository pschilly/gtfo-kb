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
}

export function AirfieldMarker({ image, className }) {
  // Accept className prop
  const selectedImage = imageMap[image]

  if (!selectedImage) {
    // Handle cases where the image name is not found
    console.warn(`Image "${image}" not found in imageMap.`)
    return null // Or render a placeholder/error message
  }

  return (
    <div>
      <Image
        src={selectedImage}
        alt="" // Consider adding a more descriptive alt text if possible
        className={clsx('mx-auto shadow-2xl', className)} // Merge class names
      />
    </div>
  )
}
