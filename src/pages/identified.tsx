import React, { useState } from 'react'
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

import type { NextPage } from 'next'
import Image from 'next/image'

import { Form } from '@unform/web'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Input from '../components/Input'
import { IUserData } from '../interfaces'
import { SteamHTTP } from '../utils/Constants'
import Request from '../utils/fetcher'

const Identified: NextPage = () => {
  const checkboxIconSize = 24
  const [userData, setUserData] = useState({} as IUserData)
  const handleSubmit = (data: { [key: string]: string }) =>
    Request('/api/v1/identified', {
      query: {
        value: data.user
      }
    }).then((data) => {
      if (data.message) {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000
        })
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
              <span className="text-3xl font-semibold text-zinc-50">
                {userData.name}
              </span>
            </div>
            <div className="p-5 space-y-2 bg-zinc-100 dark:bg-zinc-700">
              <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-3 space-y-3 sm:space-y-0">
                <div className="flex justify-center">
                  <Image
                    src={
                      userData.avatar_url?.full ||
                      '/images/jpg/default_avatar.jpg'
                    }
                    width={385}
                    height={385}
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <label className="text-zinc-500/80 dark:text-zinc-300/75">
                      Real name
                    </label>
                    <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                      {userData.realname}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <label className="text-zinc-500/80 dark:text-zinc-300/75">
                      Location
                    </label>
                    <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                      {userData.location}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <label className="text-zinc-500/80 dark:text-zinc-300/75">
                      Status
                    </label>
                    <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                      {userData.status}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <label className="text-zinc-500/80 dark:text-zinc-300/75">
                      Profile privacy
                    </label>
                    <span className="h-8 p-1 bg-zinc-300 dark:bg-zinc-800/40">
                      {userData.privacy}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 px-2 py-1 col-span-2 text-zinc-500/80 dark:text-zinc-300/75">
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
                  <div className="flex flex-col col-span-2 text-center">
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
                    <div className="h-max min-h-[2rem] p-1 bg-zinc-300 dark:bg-zinc-800/40 break-all">
                      <span>{value}</span>
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
