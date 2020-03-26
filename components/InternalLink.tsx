import React, { ReactNode, useContext } from 'react'
import NextLink from 'next/link'

interface InternalLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string // Forces href to be required - see "Gotchas"
  as?: string // Optional Next.js property to support dynamic routing
  children: ReactNode // 
}

// eslint-disable-next-line react/display-name
const InternalLink = React.forwardRef<HTMLAnchorElement, InternalLinkProps>((props, ref) => {
  // Peel off the onClick handler if given and the next props...
  const { href, as, onClick, ...rest } = props

  // I defined the handler in the component here because I need access to react context ala useContext ... not demonstrated here
  const wrappedOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (onClick) {
      // If the consumer passed in onClick, call it
      onClick(e)
    }

    // Record analytics, close menus, etc
  }

  return (
    <NextLink {...{ href, as }}>
      <a ref={ref} {...rest} onClick={wrappedOnClick} />
    </NextLink>
  )
})

export default InternalLink