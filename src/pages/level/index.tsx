import { EffectCallback, ReactNode, useEffect, useState } from 'react'

import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

import clsx from 'clsx'
import mapKeys from 'lodash/mapKeys'
import pick from 'lodash/pick'
import snakeCase from 'lodash/snakeCase'
import useLocalStorage from 'use-local-storage'

import Button from '@components/Button'
import Input from '@components/Input'
import Label from '@components/Label'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import SteamLevels from '@components/SteamLevels'
import { ILevelResponse, LevelSettings } from '@interfaces'
import { createApiRoute, numberFormatter } from '@utils'
import Request from '@utils/Fetcher'

const ResultItem = ({
  title,
  value,
  children
}: {
  title: string
  value?: string
  children?: ReactNode
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      <span className="text-md text-zinc-500 dark:text-zinc-400/75">
        {title}
      </span>
      <span className="text-4xl font-extrabold">{value ?? children}</span>
    </div>
  )
}

export default function Level () {
  const t = useTranslations('Pages.Level')

  const [settings, setSettings] = useLocalStorage(
    'steam_toolkit/level/settings',
    {} as LevelSettings
  )
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('')
  const [inputValueInvalid, setInputValueInvalid] = useState('')

  const mergeSettings = (object: { [key: string]: string }): LevelSettings =>
    Object.assign({}, settings, object)
  const useMountEffect = (effect: EffectCallback) => useEffect(effect, [])
  const validKeySize = (value: string) =>
    !!(value?.length < 32 || value?.length > 32)

  useMountEffect(() =>
    setInputType(validKeySize(settings.api_key) ? 'text' : 'password')
  )

  useEffect(() =>
    setInputValueInvalid(
      !validKeySize(settings.api_key) || settings.api_key?.length === 0
        ? 'bg-zinc-400/50 dark:bg-zinc-900 outline-none'
        : 'bg-red-400/25 outline outline-1 outline-offset-0 outline-red-600/75'
    )
  )

  const [formInputs, setFormInputs] = useState({ dreamLevel: '', rate: '' })

  const inputValueValidator = (event, field) =>
    setFormInputs((prevObject) => ({
      ...prevObject,
      [field]: event.target.validity.valid
        ? event.target.value
        : formInputs[field]
    }))

  const [userLevelingData, setUserLevelingData] = useState<ILevelResponse>(
    {} as ILevelResponse
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    setLoading(true)

    Request(createApiRoute('/leveled', 2), {
      query: {
        key: settings?.api_key,
        user: settings?.user,
        ...mapKeys(formInputs, (value, key) => snakeCase(key))
      }
    }).then((data) => {
      setLoading(false)

      if (data.message) {
        return console.log('Error: ' + data.message)
      }

      setUserLevelingData(data)
    })
  }

  return (
    <div className="flex">
      <div className="w-full mx-[25%] p-2 space-y-10">
        <div>
          <div className="flex flex-col">
            <div className="w-full flex flex-col">
              <div className="flex justify-between items-center">
                <Label>WebAPI key</Label>
                <a
                  className="pr-2 text-blue-600 dark:text-blue-500 hover:underline"
                  href="https://steamcommunity.com/dev/apikey"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('settings.webApiKey.getYourKeyHere')}
                </a>
              </div>
              <Input
                className={clsx(
                  'mb-2 px-2 py-2 placeholder-zinc-600',
                  inputValueInvalid
                )}
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
                  setSettings(mergeSettings({ api_key: event.target.value }))
                }
                defaultValue={settings?.api_key}
              />
            </div>
            <div className="w-full flex flex-col">
              <Label>{t('settings.user.label')}</Label>
              <Input
                type="text"
                placeholder={t('settings.user.placeholder')}
                onChange={(event) =>
                  setSettings(mergeSettings({ user: event.target.value }))
                }
                defaultValue={settings?.user}
              />
            </div>
          </div>
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <div className="w-full flex flex-col">
                <Label>{t('dreamLevel.label')}</Label>
                <Input
                  name="dream_level"
                  type="text"
                  placeholder={t('dreamLevel.placeholder')}
                  pattern="[0-9]*"
                  onInput={(event) => inputValueValidator(event, 'dreamLevel')}
                  value={formInputs.dreamLevel}
                />
              </div>
              <div className="w-full flex flex-col">
                <Label>{t('rate.label')}</Label>
                <Input
                  name="rate"
                  type="text"
                  placeholder={t('rate.placeholder')}
                  pattern="^\d+(\.{0,1}\d{0,2})$"
                  onInput={(event) => inputValueValidator(event, 'rate')}
                  value={formInputs.rate}
                />
              </div>
            </div>
            <Button>{t('calculate')}</Button>
          </form>
        </div>
        <div className="relative space-y-5">
          <div className="h-32 flex justify-between items-center px-[15%]">
            <SteamLevels level={userLevelingData?.level} />
            <div className="flex flex-col items-center">
              <span className="text-sm text-zinc-400">
                {t('result.xpNeeded')}
              </span>
              <span className="text-2xl font-extrabold">
                {numberFormatter(userLevelingData.xp_needed || 0)}
              </span>
            </div>
            <SteamLevels level={userLevelingData?.dream_level} />
          </div>
          <div>
            <div className="grid grid-cols-3">
              <ResultItem
                title={t('result.setsNeeded')}
                value={numberFormatter(userLevelingData.sets_needed || 0)}
              />
              <ResultItem
                title={t('result.keysNeeded')}
                value={numberFormatter(
                  +userLevelingData.keys_needed?.toFixed(1) || 0
                )}
              />
              <ResultItem
                title={t('result.coupons')}
                value={numberFormatter(userLevelingData.coupons || 0)}
              />
            </div>
            <div className="grid grid-cols-2">
              <ResultItem
                title={t('result.emoticonsAndBackgrounds')}
                value={numberFormatter(
                  userLevelingData.emoticons_and_backgrounds || 0
                )}
              />
              <ResultItem title={t('result.friends')}>
                {numberFormatter(userLevelingData.friends || 0)}
                <span className="text-zinc-400/50 dark:text-zinc-500"> / </span>
                {numberFormatter(userLevelingData.friends ? 2000 : 0)}
              </ResultItem>
            </div>
          </div>
          {loading && (
            <div className="absolute inset-0 -top-5 z-10">
              <div className="w-full h-full flex bg-zinc-200/80 dark:bg-black/80">
                <div className="m-auto">
                  <Loader loading={loading} color="rgb(225, 29, 72, 1)" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Level.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

Level.messages = ['Pages.Level', ...Layout.messages]

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: pick(
      await import(`../../assets/json/locales/${locale}.json`),
      Level.messages
    )
  }
})
