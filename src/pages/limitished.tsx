import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import type { NextPage } from 'next'

import { Form } from '@unform/web'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Input from '../components/Input'
import { IAppDetails, IPromiseFulfilledResult } from '../interfaces'
import Request from '../utils/fetcher'

const Limitished: NextPage = () => {
  const [apps, setApps] = useState([])
  const [appNamesList, setAppNamesList] = useState(null)
  const yn = (condition, yes, no) => (condition ? yes : no)
  const handleSubmit = async ({ app_ids }: { app_ids: string }) => {
    const apps = (await Promise.allSettled(
      app_ids.split(',').map(
        (appID, index) =>
          new Promise((resolve, reject) =>
            setTimeout(
              () =>
                Request(`/api/v1/limitished/details`, {
                  query: { app_id: appID }
                }).then((app) => {
                  console.log(app)
                  setApps((prevArray) => [...prevArray, app])

                  !app.removed &&
                  !app.is_free &&
                  !app.is_dlc_or_soundtrack &&
                  !app.has_profile_features_limited
                    ? resolve(app.name)
                    : reject(new Error())
                }),
              index * 3 * 1e3
            )
          )
      )
    )) as IPromiseFulfilledResult<IAppDetails>[]

    setAppNamesList(
      apps
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value)
        .join('\n')
    )
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header title="Steam Limitished" />
      <div className="flex justify-center">
        <div className="space-y-3">
          <Form onSubmit={handleSubmit}>
            <div className="px-5 py-4 border border-zinc-400/20 dark:border-zinc-800/20 bg-zinc-100 dark:bg-zinc-700">
              <div className="flex flex-col space-y-3">
                <Input
                  name="app_ids"
                  className="w-full h-8 px-2 text-zinc-600/90 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-600/75 outline-none"
                  type="text"
                  placeholder="App IDs for analysis"
                />
                <button className="h-10 w-full font-semibold text-white bg-teal-600 hover:bg-teal-500">
                  Analyze
                </button>
              </div>
            </div>
          </Form>

          <div className="flex justify-center">
            <div className="px-5 py-4 bg-zinc-100 dark:bg-zinc-700">
              <div>
                <div className="mx-auto pr-4 grid grid-cols-7 text-center text-lg bg-zinc-300 dark:bg-zinc-800/25 divide-x divide-zinc-100 dark:divide-zinc-600">
                  <div>ID</div>
                  <div className="col-span-3">App</div>
                  <div>Free</div>
                  <div>Limited</div>
                  <div className="px-2">DLC/Soundtrack</div>
                </div>
                <div className="h-80 mx-auto py-2 bg-zinc-200 dark:bg-zinc-600 overflow-y-scroll text-base">
                  {apps?.map((app) => (
                    <div
                      key={app.app_id}
                      className={
                        'grid grid-cols-7 ' +
                        yn(app.removed, 'text-white bg-red-500', '')
                      }
                    >
                      <div className="p-1">{app.app_id}</div>
                      <div className="p-1 col-span-3">{app.name}</div>
                      <div
                        className={
                          'p-1 text-center ' +
                          (!app.removed &&
                            app.is_free &&
                            'text-white bg-red-500')
                        }
                      >
                        {yn(app.is_free, 'Yes', 'No')}
                      </div>
                      <div
                        className={
                          'p-1 text-center ' +
                          (!app.removed &&
                            app.has_profile_features_limited &&
                            'text-white bg-red-500')
                        }
                      >
                        {yn(app.has_profile_features_limited, 'Yes', 'No')}
                      </div>
                      <div
                        className={
                          'p-1 text-center ' +
                          (!app.removed &&
                            app.is_dlc_or_soundtrack &&
                            'text-white bg-red-500')
                        }
                      >
                        {yn(app.is_dlc_or_soundtrack, 'Yes', 'No')}
                      </div>
                    </div>
                  ))}
                </div>
                <CopyToClipboard text={appNamesList}>
                  <button
                    className="w-full h-10 mt-3 font-semibold text-white bg-teal-600 hover:bg-teal-500"
                    onClick={null}
                  >
                    Copy list
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer hoverTextStyle="hover:text-teal-600 dark:hover:text-teal-500" />
    </div>
  )
}

export default Limitished
