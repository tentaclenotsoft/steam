import { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-zinc-800 dark:text-zinc-200 bg-zinc-200 dark:bg-black">
      <div className="h-screen flex flex-col justify-between xl:mx-24 2xl:mx-[32rem]">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
