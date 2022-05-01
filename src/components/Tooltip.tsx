import React, { ReactNode } from 'react'
import SimpleTooltip from 'react-simple-tooltip'

const Tooltip = ({
  content,
  children
}: {
  content: string
  children: ReactNode
}) => {
  return (
    <SimpleTooltip
      arrow={5}
      background={`rgb(161, 161, 170, ${content ? '0.75' : '0'})`}
      border="rgb(0, 0, 0, 0)"
      content={content}
      customCss={{ whiteSpace: 'nowrap' }}
      fadeDuration={250}
      fadeEasing="cubic-bezier(0.1, 0.9, 0.2, 0.1)"
      fontSize="12px"
      offset={5}
      padding={5}
    >
      {children}
    </SimpleTooltip>
  )
}

export default Tooltip
