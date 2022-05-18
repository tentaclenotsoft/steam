import React from 'react'
import { ToastContainer } from 'react-toastify'

import { NextIntlProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'
import '../components/leveled/SteamLevels/levels.css'
import 'react-toastify/dist/ReactToastify.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <NextIntlProvider messages={pageProps.messages}>
      <ThemeProvider attribute="class" enableSystem={false}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </NextIntlProvider>
  </>
)

export default MyApp
