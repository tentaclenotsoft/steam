import React from 'react'

import type { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import pick from 'lodash/pick'
import { NextPageWithMessages } from 'types'

import Footer from '@components/Footer'

const NotFound: NextPageWithMessages = () => {
  const t = useTranslations('NotFound')

  return (
    <div className="h-screen flex flex-col justify-between">
      <div />
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="text-5xl font-extrabold">{t('title')}</h1>
          <button className="h-10 w-fit px-3 font-semibold text-white bg-zinc-600 dark:bg-zinc-800 hover:bg-zinc-400 hover:dark:bg-zinc-600">
            <Link href="/">{t('goBackHome')}</Link>
          </button>
        </div>
      </div>
      <Footer hoverTextStyle="hover:text-zinc-500 dark:hover:text-zinc-300" />
    </div>
  )
}

NotFound.messages = ['NotFound', 'Footer']

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: pick(
      await import(`../assets/json/locales/${locale}.json`),
      NotFound.messages
    )
  }
})

export default NotFound
