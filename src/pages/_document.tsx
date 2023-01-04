import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="text-zinc-800 dark:text-zinc-200 bg-zinc-200 dark:bg-black font-proxima-nova">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
