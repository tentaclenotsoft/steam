import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="bg-gradient-to-b from-zinc-300 via-zinc-200 to-white text-zinc-800 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 dark:text-zinc-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
