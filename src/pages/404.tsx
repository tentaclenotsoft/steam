import React from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'

import Footer from '@components/Footer'

const NotFound: NextPage = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div />
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="text-5xl font-extrabold">Page not found.</h1>
          <button className="h-10 w-fit px-3 font-semibold text-white bg-zinc-600 dark:bg-zinc-800 hover:bg-zinc-400 hover:dark:bg-zinc-600">
            <Link href="/">Go back home</Link>
          </button>
        </div>
      </div>
      <Footer hoverTextStyle="hover:text-zinc-500 dark:hover:text-zinc-300" />
    </div>
  )
}

export default NotFound
