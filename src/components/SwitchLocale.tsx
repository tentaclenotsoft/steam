import React from 'react'
import Flag from 'react-flagkit'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Locales } from '@utils/Constants'

const SwitchLocale = () => {
  const { route } = useRouter()

  return (
    <div className="flex mx-auto space-x-1.5">
      {Locales.map(({ locale, country, title }, index) => (
        <Link key={index} href={route} locale={locale} passHref>
          <Flag
            className="cursor-pointer"
            country={country}
            size={21}
            title={title}
          />
        </Link>
      ))}
    </div>
  )
}

export default SwitchLocale
