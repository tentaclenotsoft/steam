import { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

export default function Layout ({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-between xl:mx-24 2xl:mx-[32rem]">
      <Header />
      <div className="mb-auto">{children}</div>
      <Footer />
    </div>
  )
}

Layout.messages = [...Footer.messages]
