import KofiButton from 'kofi-button'

import PixButton from '@components/PixButton'

export default function Footer () {
  return (
    <div className="h-72 sm:h-56 flex justify-center items-center pt-5">
      <div className="h-full flex flex-col">
        <div className="h-3/5 flex flex-col items-center">
          <span className="text-sm text-zinc-400 dark:text-zinc-400">Support this project</span>
          <div className="flex flex-col sm:flex-row justify-center my-3 sm:space-x-3 space-y-3 sm:space-y-0">
            <KofiButton
              title="Buy me a coffee!"
              color="rgb(153, 153, 153, 0.3)"
              kofiID="I2I0BJLVQ"
            />
            <PixButton title="Do the pix!" username="asd" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <span>
            {new Date().getFullYear()} ·{' '}
            <a href="/tentaclesoft" className="font-semibold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-rose-500 to-red-700">
              Tentaclesoft
            </a>
            . All right reserved
          </span>
          <span className="text-zinc-500 dark:text-zinc-500 text-xs">
            This site is not affiliated with Valve, Steam, or any of their
            partners.
          </span>
        </div>
      </div>
    </div>
  )
}
