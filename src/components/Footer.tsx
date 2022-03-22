import React from 'react'

const Footer = ({
  lightHoverColor,
  darkHoverColor
}: {
  lightHoverColor: string
  darkHoverColor: string
}) => {
  return (
    <div className="mx-5">
      <div className="flex flex-col mx-auto py-10 text-center text-sm font-light tracking-wide">
        <span>
          {new Date().getFullYear()} ·{' '}
          <a
            href="/tentaclesoft"
            className={`font-semibold hover:${lightHoverColor} dark:hover:${darkHoverColor}`}
          >
            Tentaclesoft
          </a>
          . All right reserved
        </span>
        <span className="text-zinc-500 dark:text-zinc-400 text-xs">
          This site is not affiliated with Valve, Steam, or any of their
          partners.
        </span>
      </div>
    </div>
  )
}

export default Footer
