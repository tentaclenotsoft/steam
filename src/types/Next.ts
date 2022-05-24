import type { NextPage } from 'next'

export type NextPageWithMessages<P = unknown, IP = P> = NextPage<P, IP> & {
  messages: string[]
}
