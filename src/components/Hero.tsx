import { Fragment } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Highlight } from 'prism-react-renderer'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurAmberImage from '@/images/blur-amber.png'
import blurRedImage from '@/images/blur-red.png'
import GTFOLogo from '@/images/GTFO-Logo.png'

const codeLanguage = 'javascript'
const code = `export default {
  strategy: 'predictive',
  engine: {
    cpus: 12,
    backups: ['./storage/cache.wtf'],
  },
}`

const tabs = [
  { name: 'cache-advance.config.js', isActive: true },
  { name: 'package.json', isActive: false },
]

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden dark:mt-[-4.75rem] dark:-mb-32 dark:pt-19 dark:pb-32">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute right-full bottom-full -mr-72 -mb-56 opacity-50"
              src={blurRedImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <p className="inline bg-linear-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Global Task Force Overlord
              </p>
              <p className="mt-3 text-2xl tracking-tight text-stone-400">
                Global Task Force Overlord (GTFO) is a Digital Combat Simulator
                community made up of like minded individuals who, above all
                else, value collaboration and having fun.
              </p>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 mask-[linear-gradient(transparent,white,white)] lg:-top-32 lg:right-0 lg:-bottom-32 lg:left-[calc(50%+14rem)] lg:mask-none dark:mask-[linear-gradient(transparent,white,transparent)] lg:dark:mask-[linear-gradient(white,white,transparent)]">
              {/* <HeroBackground className="absolute top-1/2 left-1/2 -transtone-x-1/2 -transtone-y-1/2 lg:left-0 lg:transtone-x-0 lg:transtone-y-[-60%]" /> */}
            </div>
            <div className="relative">
              <Image
                className="absolute -top-64 -right-64"
                src={blurAmberImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -right-44 -bottom-40"
                src={blurRedImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
              <Image src={GTFOLogo} alt="" className="h-auto w-64" priority />

              {/* <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
