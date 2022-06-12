import React, { useEffect, useState } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'

import type { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

import { Form } from '@unform/web'
import pick from 'lodash/pick'
import { NextPageWithMessages } from 'types'

import SteamLevelsTable from '@assets/json/steam-levels-table.json'
import Input from '@components/Input'
import SteamLevels from '@components/leveled/SteamLevels'
import PageLayout from '@components/PageLayout'
import Toast from '@components/Toast'
import { numberFormatter } from '@utils'
import { MAX_LEVEL } from '@utils/Constants'
import { EToastType } from '@utils/Enums'

const Table: NextPageWithMessages = () => {
  const t = useTranslations('Leveled.Table')
  const [showButton, setShowButton] = useState(false)

  useEffect(
    () =>
      window.addEventListener('scroll', () =>
        setShowButton(window.pageYOffset > 300)
      ),
    []
  )

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  const handleSubmit = ({ level }: { level: number }) => {
    if (level < 1) {
      return Toast({
        type: EToastType.ERROR,
        message: t('error.levelTooLow')
      })
    } else if (level > MAX_LEVEL) {
      return Toast({
        type: EToastType.ERROR,
        message: t('error.levelExceedsMaximumLevel', { level })
      })
    }

    window.location.href = '/leveled/table#' + level
  }

  return (
    <PageLayout
      header={{
        title: 'Steam Leveled',
        pages: [{ title: 'Leveled', path: '/leveled' }]
      }}
      footer={{
        hoverTextStyle: 'hover:text-indigo-600 dark:hover:text-indigo-500'
      }}
    >
      <div className="mx-5 sm:m-auto space-y-3">
        <div className="p-5 bg-zinc-100 dark:bg-zinc-700 drop-shadow-md">
          <Form onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <Input
                name="level"
                className="w-full h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                type="text"
                placeholder={t('placeholder')}
              />
              <button className="px-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
                {t('search')}
              </button>
            </div>
          </Form>
        </div>
        <div className="p-5 bg-zinc-100 dark:bg-zinc-700 drop-shadow-md">
          {Object.entries(SteamLevelsTable).map(
            ([levelIndex, levels], index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-center md:justify-between mt-5 sm:mt-0 hover:bg-zinc-300/50 dark:hover:bg-zinc-50/10"
              >
                <div className="flex justify-center my-auto mx-5 md:ml-6">
                  <SteamLevels level={+levelIndex} />
                </div>
                <div className="grid grid-cols-5 xl:grid-cols-10 sm:ml-8 py-3 xl:divide-x divide-zinc-300/60 dark:divide-zinc-500/30">
                  {levels.map(({ level, xp }, index) => (
                    <div
                      id={level.toString()}
                      key={index}
                      className="w-max sm:w-24 flex flex-col content-center m-auto py-1 text-center"
                    >
                      <span className="text-xl">{level}</span>
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {numberFormatter(xp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {showButton && (
        <button
          className="fixed right-5 bottom-5 p-1 text-white bg-indigo-600 hover:bg-indigo-500 drop-shadow-md"
          onClick={scrollToTop}
        >
          <BiUpArrowAlt size={30} />
        </button>
      )}
    </PageLayout>
  )
}

Table.messages = ['Leveled.Table', ...PageLayout.messages]

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: pick(
      await import(`../../assets/json/locales/${locale}.json`),
      Table.messages
    )
  }
})

export default Table
