import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="font-proxima-nova">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
