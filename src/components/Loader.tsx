import { ScaleLoader } from 'react-spinners'

export default function Loader ({ ...props }) {
  return (
    <ScaleLoader
      width={6}
      height={25}
      radius={0}
      margin={2}
      speedMultiplier={0.75}
      {...props}
    />
  )
}
