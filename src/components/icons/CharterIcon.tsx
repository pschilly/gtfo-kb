import { DarkMode, Gradient, LightMode } from '@/components/Icon'
import { TbCertificate } from 'react-icons/tb'

export function CharterIcon({
  id,
  color,
}: {
  id: string
  color?: React.ComponentProps<typeof Gradient>['color']
}) {
  return (
    <>
      <LightMode>
        <TbCertificate size={32} />
      </LightMode>
      <DarkMode>
        <TbCertificate size={32} />
      </DarkMode>
    </>
  )
}
