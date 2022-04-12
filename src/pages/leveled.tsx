import React, { EffectCallback, useEffect, useState } from 'react'

import type { NextPage } from 'next'

import { Form } from '@unform/web'
import QS from 'querystring'
import useLocalStorage from 'use-local-storage'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Input from '../components/Input'
import SteamLevels from '../components/leveled/SteamLevels'
import { numberFormatter } from '../utils'

interface LeveledSettings {
  steam_api_key: string
  steam_id: string
}

interface ILeveled {
  xp: number
  level: number
  xp_needed_to_level_up: number
  sets_needed_to_level_up: number
  keys_needed_to_level_up: number
  dream_level: number
  sets_needed: number
  xp_needed: number
  keys_needed: number
  emoticons_and_backgrounds: number
}

const Leveled: NextPage = () => {
  const [leveledSettings, setLeveledSettings] = useLocalStorage(
    'leveled/settings',
    {} as LeveledSettings
  )
  const mergeLeveledSettings = (object: {
    [key: string]: string
  }): LeveledSettings => Object.assign({}, leveledSettings, object)
  const [inputType, setInputType] = useState('')
  const [inputOutline, setInputOutline] = useState('')
  const useMountEffect = (effect: EffectCallback) => useEffect(effect, [])
  const validKeySize = (value: string) =>
    !!(value?.length < 32 || value?.length > 32)

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

  const [leveledData, setLeveledData] = useState<ILeveled>({} as ILeveled)
  const handleSubmit = (data: { [key: string]: string }) =>
    fetch(
      `/api/v1/leveled/level?${QS.stringify({
        key: leveledSettings?.steam_api_key,
        steam_id: leveledSettings?.steam_id,
        ...data
      })}`
    ).then(async (response) => setLeveledData(await response.json()))

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header title="Steam Leveled" />
      <div className="flex justify-center">
        <div className="w-96 sm:w-fit mx-5 sm:m-auto space-y-3 drop-shadow-md">
          <div>
            <div className="px-5 py-2 bg-zinc-500 dark:bg-zinc-800">
              <span className="text-zinc-50 font-semibold">Settings</span>
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
                      Get your key here
                    </a>
                  </div>
                  <input
                    className={`w-full lg:w-80 h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none ${inputOutline}`}
                    type={inputType}
                    placeholder="Your key (stored in your browser only)"
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
                  <label className="mb-1">SteamID</label>
                  <input
                    className="w-full lg:w-80 h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                    type="text"
                    placeholder="Your SteamID"
                    onChange={(event) =>
                      setLeveledSettings(
                        mergeLeveledSettings({
                          steam_id: event.target.value
                        })
                      )
                    }
                    defaultValue={leveledSettings?.steam_id}
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
                    <label className="mb-1">Dream level</label>
                    <Input
                      name="dream_level"
                      className="h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                      type="text"
                      placeholder="Your dream level"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1">Rate</label>
                    <Input
                      name="rate"
                      className="h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                      type="text"
                      placeholder="Rate of purchase"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="h-10 w-full font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
                    Calculate!
                  </button>
                </div>
              </Form>
            </div>
            <div className="w-full flex flex-col px-5 py-4 border border-zinc-400/20 dark:border-zinc-800/20 bg-zinc-100 dark:bg-zinc-700 space-y-5">
              <div className="h-16 flex justify-between items-center mx-4 sm:mx-10">
                <div className="scale-125">
                  <SteamLevels level={leveledData?.level} />
                </div>
                <div className="flex flex-col items-center text-center font-light -space-y-1">
                  <span className="text-zinc-400 text-xs">XP needed</span>
                  <span className="text-2xl">
                    {numberFormatter(leveledData.xp_needed || 0)}
                  </span>
                </div>
                <div className="scale-125">
                  <SteamLevels level={leveledData?.dream_level} />
                </div>
              </div>
              <div className="h-full grid grid-cols-2">
                <div className="flex flex-col m-auto items-center text-center">
                  <span className="text-zinc-400 text-sm">Sets needed</span>
                  <span className="text-xl">
                    {numberFormatter(leveledData.sets_needed || 0)}
                  </span>
                </div>
                <div className="flex flex-col m-auto items-center text-center">
                  <span className="text-zinc-400 text-sm">Keys needed</span>
                  <span className="text-xl">
                    {numberFormatter(+leveledData.keys_needed?.toFixed(1) || 0)}
                  </span>
                </div>
                <div className="flex flex-col m-auto items-center text-center col-span-2">
                  <span className="text-zinc-400 text-sm">
                    Emoticons & Background
                  </span>
                  <span className="text-xl">
                    {numberFormatter(
                      leveledData.emoticons_and_backgrounds || 0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer hoverTextStyle="hover:text-indigo-600 dark:hover:text-indigo-500" />
    </div>
  )
}

export default Leveled
