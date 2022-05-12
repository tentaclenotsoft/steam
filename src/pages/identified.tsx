import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  RiArrowRightUpLine,
  RiCheckboxBlankLine,
  RiCheckboxLine,
  RiFileCopyFill
} from 'react-icons/ri'

import type { NextPage } from 'next'
import Image from 'next/image'

import { Form } from '@unform/web'

import Footer from '@components/Footer'
import Header from '@components/Header'
import Input from '@components/Input'
import SteamLevels from '@components/leveled/SteamLevels'
import Toast from '@components/Toast'
import { IUserData } from '@interfaces'
import { createApiRoute } from '@utils'
import { SteamHTTP } from '@utils/Constants'
import { EToastType } from '@utils/Enums'
import Request from '@utils/Fetcher'

const Identified: NextPage = () => {
  const checkboxIconSize = 24
  const [userData, setUserData] = useState({} as IUserData)
  const handleSubmit = (data: { [key: string]: string }) =>
    Request(createApiRoute('/identified'), {
      query: {
        value: data.user
      }
    }).then((data) => {
      if (data.message) {
        return Toast({ type: EToastType.ERROR, message: data.message })
      }

      setUserData(data)
    })

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header title="Steam Identified" />
      <div className="mx-5 sm:m-auto">
        <div className="space-y-3">
          <div className="p-5 bg-zinc-100 dark:bg-zinc-700 drop-shadow-md">
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Input
                  name="user"
                  className="w-full h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                  type="text"
                  placeholder="Steam ID, custom URL or profile link"
                />
                <div className="mt-4">
                  <button className="h-10 w-full font-semibold text-white bg-red-600 hover:bg-red-500">
                    Find
                  </button>
                </div>
              </div>
            </Form>
          </div>
          <div className="drop-shadow-md">
            <div className="h-[3.25rem] py-2 text-center bg-zinc-500 dark:bg-zinc-800">
              <span className="text-3xl font-semibold text-zinc-50 hover:text-zinc-200 dark:hover:text-zinc-300">
                <a
                  className="flex justify-center"
                  href={`${SteamHTTP.COMMUNITY}/profiles/${userData.steam_id64}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {userData.name}
                </a>
              </span>
            </div>
            {userData.limitations?.community_ban ? (
              <div className="h-5 text-sm text-center text-white bg-red-500">
                <span className="animate-pulse">Community Banned</span>
              </div>
            ) : (
              <div className="h-5 bg-zinc-100 dark:bg-zinc-700" />
            )}
            <div className="md:min-w-[45rem] max-w-[45rem] px-5 pb-5 pt-1 space-y-2 bg-zinc-100 dark:bg-zinc-700">
              <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-3 space-y-3 sm:space-y-0">
                <div className="flex flex-col mt-1.5">
                  <div className="relative select-none">
                    <Image
                      src={
                        userData.avatar_url?.full ||
                        '/images/jpg/default_avatar.jpg'
                      }
                      width={385}
                      height={385}
                      draggable={false}
                      onContextMenu={(event) => event.preventDefault()}
                    />
                    {userData.avatar_url?.full && (
                      <button className="h-[2.3rem] absolute inset-0 z-10 left-auto text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] opacity-50 hover:opacity-75">
                        <a
                          href={userData.avatar_url?.full}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <RiArrowRightUpLine size={36} />
                        </a>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 text-zinc-500/80 dark:text-zinc-300/75 divide-x divide-zinc-300 dark:divide-zinc-500/50">
                    {userData.avatar_url &&
                      Object.entries(userData.avatar_url).map(
                        ([size, url], index) => (
                          <a
                            key={index}
                            className="text-center hover:bg-zinc-200/75 dark:hover:bg-zinc-500/25"
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {size.slice(0, 1).toUpperCase()}
                          </a>
                        )
                      )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="w-full flex flex-col space-y-2">
                      <div className="flex flex-col">
                        <label className="text-zinc-500/80 dark:text-zinc-300/75">
                          Real name
                        </label>
                        <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                          {userData.realname?.length > 43
                            ? `${userData.realname?.slice(0, 40)}...`
                            : userData.realname}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-zinc-500/80 dark:text-zinc-300/75">
                          Location
                        </label>
                        <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                          {userData.location}
                        </span>
                      </div>
                    </div>
                    <div className="p-10 my-auto scale-[1.7]">
                      <SteamLevels level={userData?.level} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-2 sm:space-x-2 space-y-2 sm:space-y-0">
                    <div className="w-full flex flex-col">
                      <label className="text-zinc-500/80 dark:text-zinc-300/75">
                        Status
                      </label>
                      <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                        {userData.status}
                      </span>
                    </div>
                    <div className="w-full flex flex-col">
                      <label className="text-zinc-500/80 dark:text-zinc-300/75">
                        Profile privacy
                      </label>
                      <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                        {userData.privacy}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 px-2 py-1 text-zinc-500/80 dark:text-zinc-300/75">
                    <span className="flex space-x-1.5">
                      <span>VAC</span>
                      {userData.limitations?.vac ? (
                        <RiCheckboxLine
                          color="rgb(220, 38, 38)"
                          size={checkboxIconSize}
                        />
                      ) : (
                        <RiCheckboxBlankLine size={checkboxIconSize} />
                      )}
                    </span>
                    <span className="flex space-x-1.5">
                      <span>Trade Ban</span>
                      {userData.limitations?.trade_ban ? (
                        <RiCheckboxLine
                          color="rgb(220, 38, 38)"
                          size={checkboxIconSize}
                        />
                      ) : (
                        <RiCheckboxBlankLine size={checkboxIconSize} />
                      )}
                    </span>
                    <span className="flex space-x-1.5">
                      <span>Limited</span>
                      {userData.limitations?.limited ? (
                        <RiCheckboxLine
                          color="rgb(220, 38, 38)"
                          size={checkboxIconSize}
                        />
                      ) : (
                        <RiCheckboxBlankLine size={checkboxIconSize} />
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col text-center">
                    <label className="text-zinc-500/80 dark:text-zinc-300/75">
                      Member since
                    </label>
                    <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                      {userData.member_since}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full pt-2 space-y-1.5">
                {[
                  { label: 'Steam 3ID', value: userData.steam_3id },
                  { label: 'Steam ID32', value: userData.steam_id32 },
                  { label: 'Steam ID64', value: userData.steam_id64 },
                  {
                    label: 'Profile URL',
                    value: userData.custom_url
                      ? `${SteamHTTP.COMMUNITY}/id/${userData.custom_url}`
                      : ''
                  },
                  {
                    label: 'Profile Permalink',
                    value: userData.steam_id64
                      ? `${SteamHTTP.COMMUNITY}/profiles/${userData.steam_id64}`
                      : ''
                  }
                ].map(({ label, value }, index) => (
                  <div key={index}>
                    <span className="text-zinc-500/80 dark:text-zinc-300/75">
                      {label}
                    </span>
                    <div className="h-max min-h-[2rem] flex justify-between p-1 bg-zinc-300 dark:bg-zinc-800/40 break-all">
                      {value && (
                        <>
                          <span>{value}</span>
                          <CopyToClipboard text={value}>
                            <button
                              className="grid content-center text-zinc-600 dark:text-zinc-300"
                              onClick={() =>
                                Toast({
                                  type: EToastType.SUCCESS,
                                  message: `${label} has been copied to clipboard`
                                })
                              }
                            >
                              <RiFileCopyFill size={20} />
                            </button>
                          </CopyToClipboard>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer hoverTextStyle="hover:text-red-600 dark:hover:text-red-500" />
    </div>
  )
}

export default Identified
