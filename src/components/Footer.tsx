import React from 'react'

import KofiButton from 'kofi-button'

import SwitchLocale from './SwitchLocale'

const Footer = ({ hoverTextStyle }: { hoverTextStyle: string }) => {
  return (
    <div className="bg-gradient-to-t from-zinc-100 dark:from-zinc-700 to-transparent">
      <div className="mx-5">
        <div className="flex flex-col mx-auto py-10 text-center text-sm font-light tracking-wide">
          <span>
            {new Date().getFullYear()} ·{' '}
            <a
              href="/tentaclesoft"
              className={`font-semibold ${hoverTextStyle}`}
            >
              Tentaclesoft
            </a>
            . All right reserved
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-xs">
            This site is not affiliated with Valve, Steam, or any of their
            partners.
          </span>
          <div className="my-3">
            <KofiButton
              title="Buy me a coffee!"
              color="rgb(153, 153, 153, 0.3)"
              kofiID="I2I0BJLVQ"
            />
          </div>
          <SwitchLocale />
        </div>
      </div>
    </div>
  )
}

export default Footer
