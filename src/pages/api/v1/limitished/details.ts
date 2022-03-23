import { NextApiRequest, NextApiResponse } from 'next'

import {
  IAppDetails,
  IAppDetailsResponse,
  IAppProfileFeaturesLimitedResponse,
  IPromiseFulfilledResult
} from '../../../../interfaces'
import { getAppDetails, getAppProfileFeaturesLimited } from '../../../../utils'

const App = async (appID: number) => {
  try {
    const appPromised = (await Promise.allSettled(
      [getAppDetails, getAppProfileFeaturesLimited].map(
        (appPromise) =>
          new Promise((resolve) =>
            setTimeout(() => resolve(appPromise(appID)), Math.random() * 1e3)
          )
      )
    )) as IPromiseFulfilledResult<
      IAppDetailsResponse | IAppProfileFeaturesLimitedResponse
    >[]

    const app: IAppDetails = Object.assign(
      {},
      ...appPromised.map(({ value }) => value)
    )

    return app
  } catch (error) {
    throw new Error(error.message)
  }
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { app_id } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await App(+app_id as number))
      } catch (error) {
        const { message } = error as Error
        response.status(500).json({ message })
      }
      break
    default:
      response.status(405).end('Method Not Allowed')
      break
  }
}
