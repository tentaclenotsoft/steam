import React, { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

const PageLayout = ({
  header,
  footer,
  children
}: {
  header: { title: string; pages?: [{ title: string; path: string }] }
  footer: { hoverTextStyle: string }
  children: ReactNode
}) => {
  return (
    <div className="h-screen flex flex-col justify-between text-zinc-800 dark:text-zinc-50 bg-zinc-300 dark:bg-zinc-700 bg-topography">
      <Header {...header} />
      {children}
      <Footer {...footer} />
    </div>
  )
}

PageLayout.messages = [...Footer.messages]

export default PageLayout
