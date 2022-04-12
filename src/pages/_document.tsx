import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="text-zinc-800 dark:text-zinc-50 bg-zinc-300 dark:bg-zinc-900 bg-topography font-proxima-nova">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
