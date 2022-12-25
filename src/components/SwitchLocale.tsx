import Flag from 'react-flagkit'
import { MdOutlineTranslate } from 'react-icons/md'

import Link from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'

import { Locales } from '@utils/Constants'

import Dropdown, { DropdownItem } from './Dropdown'

export default function SelectLocale () {
  const { route } = useRouter()

  return (
    <Dropdown
      icon={
        <MdOutlineTranslate size={21} style={{ transform: 'scale(1, 0.9)' }} />
      }
    >
      {Locales.map(({ locale, code, title }, index) => (
        <Link key={`${locale}-${index}`} href={route} locale={locale}>
          <a
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' })
              )
            }
          >
            <DropdownItem
              className={clsx(
                'px-4 py-2 select-none',
                'bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800',
                'focus:outline-none cursor-pointer'
              )}
              onSelect={(event) => event.preventDefault()}
            >
              <Flag country={code} size={21} title={title} />
            </DropdownItem>
          </a>
        </Link>
      ))}
    </Dropdown>
  )
}
