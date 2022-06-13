import React from 'react'

import Image from 'next/image'

const PixButton = ({
  title,
  username
}: {
  title: string
  username: string
}) => {
  return (
    <a href={`https://livepix.gg/${username}`} target="_blank" rel="noreferrer">
      <div className="h-10 flex items-center border rounded-tl-2xl rounded-br-2xl text-zinc-500 hover:text-zinc-600 bg-white/90 drop-shadow">
        <div className="h-full flex px-3 rounded-tl-2xl rounded-br-2xl bg-zinc-500">
          <Image src="/images/svg/pix-logo.svg" width={25} height={25} />
        </div>
        <span className="px-3 text-lg font-semibold tracking-tight">
          {title}
        </span>
      </div>
    </a>
  )
}

export default PixButton
