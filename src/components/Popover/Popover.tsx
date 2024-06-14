import React from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useHover,
  arrow,
  FloatingArrow
} from '@floating-ui/react'
import { useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  popoverContent: React.ReactNode
}

export default function Popover({ children, popoverContent }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(0),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  })
  const hover = useHover(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role])

  return (
    <div ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className='outline-none'>
            {popoverContent}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={26}
              height={10}
              className='fill-white stroke-gray-200 [&>path:first-of-type]:stroke-pink-500 [&>path:last-of-type]:stroke-white'
            />
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}
