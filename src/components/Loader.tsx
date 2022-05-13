import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loader = ({ ...rest }: { [key: string]: unknown }) => {
  return (
    <ScaleLoader
      width={6}
      height={25}
      radius={0}
      margin={2}
      speedMultiplier={0.75}
      {...rest}
    />
  )
}

export default Loader
