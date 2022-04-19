import React, { useEffect, useState } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'
import { toast } from 'react-toastify'

import type { NextPage } from 'next'

import { Form } from '@unform/web'

import SteamLevelsTable from '../../assets/json/steam-levels-table.json'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Input from '../../components/Input'
import SteamLevels from '../../components/leveled/SteamLevels'
import { numberFormatter } from '../../utils'
import { MAX_LEVEL } from '../../utils/Constants'

const Table: NextPage = () => {
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
    if (level > MAX_LEVEL) {
      return toast.error(`Level ${level} exceeds the maximum Steam level`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000
      })
    }

    window.location.href = '/leveled/table#' + level
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header
        title="Steam Leveled"
        pages={[{ title: 'Leveled', path: '/leveled' }]}
      />
      <div className="mx-5 sm:m-auto space-y-3">
        <div className="p-5 bg-zinc-100 dark:bg-zinc-700 drop-shadow-md">
          <Form onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <Input
                name="level"
                className="w-full h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                type="text"
                placeholder="Level"
              />
              <button className="px-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
                Search
              </button>
            </div>
          </Form>
        </div>
        <div className="p-5 bg-zinc-100 dark:bg-zinc-700 drop-shadow-md">
          {Object.entries(SteamLevelsTable).map(
            ([levelIndex, levels], index) => (
              <div
                key={index}
                className="flex justify-center md:justify-between hover:bg-zinc-300/50 dark:hover:bg-zinc-50/10"
              >
                <div className="my-auto mx-5 md:ml-6">
                  <SteamLevels level={+levelIndex} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 ml-8 py-3 xl:divide-x divide-zinc-300/60 dark:divide-zinc-500/30">
                  {levels.map(({ level, xp }, index) => (
                    <div
                      id={level.toString()}
                      key={index}
                      className="w-24 flex flex-col content-center py-1 text-center"
                    >
                      <span className="text-xl">{level}</span>
                      <span className="text-zinc-400 text-sm">
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
      <Footer hoverTextStyle="hover:text-indigo-600 dark:hover:text-indigo-500" />
    </div>
  )
}

export default Table
