import React from 'react'

import type { NextPage } from 'next'

import SteamLevelsTable from '../../assets/json/steam-levels-table.json'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import SteamLevels from '../../components/leveled/SteamLevels'
import { numberFormatter } from '../../utils'

const Table: NextPage = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header
        title="Steam Leveled"
        pages={[{ title: 'Leveled', path: '/leveled' }]}
      />
      <div className="mx-5 sm:m-auto">
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
                <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-10 ml-8 py-3 xl:divide-x divide-zinc-300 dark:divide-zinc-500">
                  {levels.map(({ level, xp }, index) => (
                    <div
                      key={index}
                      className="w-24 flex flex-col content-center text-center"
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
      <Footer hoverTextStyle="hover:text-indigo-600 dark:hover:text-indigo-500" />
    </div>
  )
}

export default Table
