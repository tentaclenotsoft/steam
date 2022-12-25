import { useTranslations } from 'next-intl'

import KofiButton from 'kofi-button'

import PixButton from '@components/PixButton'

import SelectLocale from './SwitchLocale'

export default function Footer () {
  const t = useTranslations('Components.Footer')

  return (
    <div className="h-72 sm:h-60 flex justify-center items-center pt-5">
      <div className="h-full flex flex-col">
        <div className="h-3/5 flex flex-col items-center">
          <span className="text-sm text-zinc-400 dark:text-zinc-400">
            {t('supportArea.supportThisProject')}
          </span>
          <div className="flex flex-col sm:flex-row justify-center my-3 sm:space-x-3 space-y-3 sm:space-y-0">
            <KofiButton
              title={t('supportArea.buyMeACoffee')}
              color="rgb(153, 153, 153, 0.3)"
              kofiID="I2I0BJLVQ"
            />
            <PixButton title={t('supportArea.doThePix')} username="asd" />
          </div>
        </div>
        <div className="sm:flex justify-content">
          <div className="flex flex-col justify-center items-center text-center sm:pr-8">
            <span>
              {new Date().getFullYear()} ·{' '}
              <a
                href="/tentaclesoft"
                className="font-semibold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-rose-500 to-red-700"
              >
                Tentaclesoft
              </a>
              . {t('allRightReserved')}
            </span>
            <span className="text-zinc-500 dark:text-zinc-500 text-xs">
              {t('siteHasNoAffiliation')}
            </span>
          </div>
          <div className="flex justify-center px-4 py-2 my-2 sm:my-0 md:pl-10 md:border-l border-zinc-300 dark:border-zinc-900">
            <SelectLocale />
          </div>
        </div>
      </div>
    </div>
  )
}

Footer.messages = ['Footer']
