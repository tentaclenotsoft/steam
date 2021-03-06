import React, { EffectCallback, useEffect, useState } from 'react'

import type { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

import { Form } from '@unform/web'
import pick from 'lodash/pick'
import { NextPageWithMessages } from 'types'
import useLocalStorage from 'use-local-storage'

import Input from '@components/Input'
import SteamLevels from '@components/leveled/SteamLevels'
import Loader from '@components/Loader'
import PageLayout from '@components/PageLayout'
import Toast from '@components/Toast'
import Tooltip from '@components/Tooltip'
import { ILeveledResponse, LeveledSettings } from '@interfaces'
import { createApiRoute, numberFormatter } from '@utils'
import { EToastType } from '@utils/Enums'
import Request from '@utils/Fetcher'

const Leveled: NextPageWithMessages = () => {
  const t = useTranslations('Leveled')
  const [leveledSettings, setLeveledSettings] = useLocalStorage(
    'leveled/settings',
    {} as LeveledSettings
  )
  const mergeLeveledSettings = (object: {
    [key: string]: string
  }): LeveledSettings => Object.assign({}, leveledSettings, object)
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('')
  const [inputOutline, setInputOutline] = useState('')
  const useMountEffect = (effect: EffectCallback) => useEffect(effect, [])
  const validKeySize = (value: string) =>
    !!(value?.length < 32 || value?.length > 32)
  const tooltipWithLevelXP = (value) => value && numberFormatter(value) + ' XP'

  useMountEffect(() =>
    setInputType(
      validKeySize(leveledSettings.steam_api_key) ? 'text' : 'password'
    )
  )

  useEffect(() =>
    setInputOutline(
      !validKeySize(leveledSettings.steam_api_key) ||
        leveledSettings.steam_api_key?.length === 0
        ? 'outline-none'
        : 'outline outline-1 outline-offset-0 outline-red-600/75'
    )
  )

  const [inputValidValue, setInputValidValue] = useState({
    dreamLevel: '',
    rate: ''
  })

  const inputValueValidator = (event, field) =>
    setInputValidValue((prevObject) => ({
      ...prevObject,
      [field]: event.target.validity.valid
        ? event.target.value
        : inputValidValue[field]
    }))

  const [leveledData, setLeveledData] = useState<ILeveledResponse>(
    {} as ILeveledResponse
  )

  const handleSubmit = (data: { [key: string]: string }) => {
    setLoading(true)

    Request(createApiRoute('/leveled', 2), {
      query: {
        key: leveledSettings?.steam_api_key,
        user: leveledSettings?.user,
        ...data
      }
    }).then((data) => {
      setLoading(false)

      if (data.message) {
        return Toast({
          type: EToastType.ERROR,
          message: t(`error.${data.code}`)
        })
      }

      setLeveledData(data)
    })
  }

  return (
    <PageLayout
      header={{
        title: 'Steam Leveled',
        pages: [{ title: 'Table', path: '/leveled/table' }]
      }}
      footer={{
        hoverTextStyle: 'hover:text-indigo-600 dark:hover:text-indigo-500'
      }}
    >
      <div className="flex justify-center">
        <div className="w-96 sm:w-fit mx-5 sm:m-auto space-y-3 drop-shadow-md">
          <div>
            <div className="px-5 py-2 bg-zinc-500 dark:bg-zinc-800">
              <span className="text-zinc-50 font-semibold">
                {t('settings.title')}
              </span>
            </div>
            <div className="px-5 py-4 border border-zinc-400/20 dark:border-zinc-800/20 bg-zinc-100 dark:bg-zinc-700">
              <div className="lg:flex lg:space-x-4 space-y-3 lg:space-y-0">
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <label>WebAPI key</label>
                    <a
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                      href="https://steamcommunity.com/dev/apikey"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('settings.webApiKey.getYourKeyHere')}
                    </a>
                  </div>
                  <input
                    className={`w-full lg:w-80 h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none ${inputOutline}`}
                    type={inputType}
                    placeholder={t('settings.webApiKey.placeholder')}
                    autoComplete="off"
                    onBlur={(event) =>
                      setInputType(
                        validKeySize(event.currentTarget.value)
                          ? 'text'
                          : 'password'
                      )
                    }
                    onFocus={() => setInputType('text')}
                    onChange={(event) =>
                      setLeveledSettings(
                        mergeLeveledSettings({
                          steam_api_key: event.target.value
                        })
                      )
                    }
                    defaultValue={leveledSettings?.steam_api_key}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1">{t('settings.user.label')}</label>
                  <input
                    className="w-full lg:w-80 h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                    type="text"
                    placeholder={t('settings.user.placeholder')}
                    onChange={(event) =>
                      setLeveledSettings(
                        mergeLeveledSettings({
                          user: event.target.value
                        })
                      )
                    }
                    defaultValue={leveledSettings?.user}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0">
            <div className="grid lg:flex-col px-5 py-4 lg:space-x-0 border border-zinc-400/20 dark:border-zinc-800/20 bg-zinc-100 dark:bg-zinc-700">
              <Form onSubmit={handleSubmit}>
                <div className="sm:flex lg:flex-col sm:space-x-4 lg:space-x-0 space-y-4 sm:space-y-0 lg:space-y-4">
                  <div className="flex flex-col">
                    <label className="mb-1">{t('dreamLevel.label')}</label>
                    <Input
                      name="dream_level"
                      className="h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                      type="text"
                      placeholder={t('dreamLevel.placeholder')}
                      pattern="[0-9]*"
                      onInput={(event) =>
                        inputValueValidator(event, 'dreamLevel')
                      }
                      value={inputValidValue.dreamLevel}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1">{t('rate.label')}</label>
                    <Input
                      name="rate"
                      className="h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                      type="text"
                      placeholder={t('rate.placeholder')}
                      pattern="^\d+(\.{0,1}\d{0,2})$"
                      onInput={(event) => inputValueValidator(event, 'rate')}
                      value={inputValidValue.rate}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className={`h-10 w-full font-semibold text-white ${
                      !loading
                        ? 'bg-indigo-600 hover:bg-indigo-500'
                        : 'bg-indigo-600/50 cursor-not-allowed'
                    }`}
                    disabled={loading}
                  >
                    {t('calculate')}
                  </button>
                </div>
              </Form>
            </div>
            <div className="w-full relative flex flex-col px-5 py-4 border border-zinc-400/20 dark:border-zinc-800/20 bg-zinc-100 dark:bg-zinc-700 space-y-5">
              <div className="h-16 flex justify-between items-center mx-4 sm:mx-10">
                <div className="scale-125">
                  <Tooltip content={tooltipWithLevelXP(leveledData?.xp)}>
                    <SteamLevels level={leveledData?.level} />
                  </Tooltip>
                </div>
                <div className="flex flex-col items-center text-center font-light -space-y-1">
                  <span className="text-zinc-400 text-xs">
                    {t('result.xpNeeded')}
                  </span>
                  <span className="text-2xl">
                    {numberFormatter(leveledData.xp_needed || 0)}
                  </span>
                </div>
                <div className="scale-125">
                  <Tooltip
                    content={tooltipWithLevelXP(
                      leveledData?.xp_from_dream_level
                    )}
                  >
                    <SteamLevels level={leveledData?.dream_level} />
                  </Tooltip>
                </div>
              </div>
              <div className="h-full grid grid-cols-2 sm:grid-cols-3">
                <div className="flex flex-col m-auto items-center text-center">
                  <span className="text-zinc-400 text-sm">
                    {t('result.setsNeeded')}
                  </span>
                  <span className="text-xl">
                    {numberFormatter(leveledData.sets_needed || 0)}
                  </span>
                </div>
                <div className="flex flex-col m-auto items-center text-center">
                  <span className="text-zinc-400 text-sm">
                    {t('result.keysNeeded')}
                  </span>
                  <span className="text-xl">
                    {numberFormatter(+leveledData.keys_needed?.toFixed(1) || 0)}
                  </span>
                </div>
                <div className="flex flex-col m-auto items-center text-center">
                  <span className="text-zinc-400 text-sm">
                    {t('result.coupons')}
                  </span>
                  <span className="text-xl">
                    {numberFormatter(+leveledData.coupons || 0)}
                  </span>
                </div>
                <div className="flex flex-col m-auto items-center text-center sm:col-span-2">
                  <span className="text-zinc-400 text-sm">
                    {t('result.emoticonsAndBackground')}
                  </span>
                  <span className="text-xl">
                    {numberFormatter(
                      leveledData.emoticons_and_backgrounds || 0
                    )}
                  </span>
                </div>
                <div className="flex flex-col m-auto items-center text-center">
                  <span className="text-zinc-400 text-sm">
                    {t('result.friends')}
                  </span>
                  <span className="text-xl">
                    {numberFormatter(leveledData.friends || 0)}
                    <span className="text-zinc-400/50 dark:text-zinc-500">
                      {' '}
                      /{' '}
                    </span>
                    {numberFormatter(leveledData.friends ? 2000 : 0)}
                  </span>
                </div>
              </div>
              {loading && (
                <div className="absolute inset-0 -top-5 z-10">
                  <div className="w-full h-full flex bg-zinc-300/80 dark:bg-zinc-700/80">
                    <div className="m-auto">
                      <Loader loading={loading} color="rgb(79 70 229)" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

Leveled.messages = ['Leveled', ...PageLayout.messages]

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: pick(
      await import(`../../assets/json/locales/${locale}.json`),
      Leveled.messages
    )
  }
})

export default Leveled
