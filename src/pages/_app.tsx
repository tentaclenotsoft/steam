import { NextComponentType, NextPageContext } from 'next'
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'
import '../components/SteamLevels/styles.css'

type CustomAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    getLayout: () => void
  }
  pageProps: {
    messages: AbstractIntlMessages
  }
}

export default function MyApp ({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </NextIntlProvider>
    </>
  )
}
