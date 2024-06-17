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
  FloatingArrow,
  useClick
} from '@floating-ui/react'
import { useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  popoverContent: React.ReactNode
  hasArrow?: boolean
  offsetWithPopover?: number
  arrowHeight?: number
  fillArrowColor?: string
  triggerType?: 'click' | 'hover'
}

export default function Popover({
  children,
  popoverContent,
  hasArrow = true,
  offsetWithPopover = 0,
  arrowHeight = 10,
  fillArrowColor = 'fill-white',
  triggerType = 'hover'
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(arrowHeight + offsetWithPopover),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  })

  const hover = useHover(context, {
    enabled: triggerType === 'hover'
  })
  const click = useClick(context, {
    enabled: triggerType === 'click'
  })
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role, click])
  return (
    <div ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          {/* Thẻ div dưới dây bao bọc lun cả arrow để tránh việc bị nhấp nháy popover trong quá trình hover */}
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              paddingTop: `${arrowHeight + offsetWithPopover}px`,
              marginTop: `-${arrowHeight + offsetWithPopover}px`
            }}
            {...getFloatingProps()}
            // -mt và pt làm cho popover content arrow được sát gần lại với children hơn
            // do đó làm mất đi khoảng cách giữa children và popover conent
            className='outline-none'
          >
            {popoverContent}
            {hasArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={arrowHeight * 2}
                height={arrowHeight}
                style={{ top: `-${arrowHeight + offsetWithPopover - 1}px` }}
                className={`${fillArrowColor} dark:fill-slate-800`}
              />
            )}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}
