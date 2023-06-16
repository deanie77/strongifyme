import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type DevToolViewportProps = {
  showViewport: boolean
}

const DEV_TOOL_VIEWPORT_ID = 'dev-tool-viewport'

/**
 * Renders a box displaying the current width and height of the viewport.
 * The component listens to window resize events and updates the screenDimensions state accordingly.
 */
export const DevToolViewport = ({ showViewport }: DevToolViewportProps) => {
  const [screenDimensions, setScreenDimensions] = useState<{ width: number; height: number }>({
    width: window.screen.width,
    height: window.screen.height,
  })

  const getScreenDimensions = (e: any) => {
    const width = window.innerWidth
    const height = window.innerHeight

    setScreenDimensions({ width, height })
  }

  // getCurrentBreakpoint
  const screenW = screenDimensions.width

  const isBase = screenW <= 479
  const isSM = screenW >= 480 && screenW <= 767
  const isMd = screenW >= 768 && screenW <= 991
  const isLg = screenW >= 992 && screenW <= 1279
  const isXl = screenW >= 1280 && screenW <= 1535
  const is2Xl = screenW >= 1536

  const getCurrentBreakpoint = (): string => {
    if (isBase) return 'base'
    if (isSM) return 'sm'
    if (isMd) return 'md'
    if (isLg) return 'lg'
    if (isXl) return 'xl'
    if (is2Xl) return '2xl'
    return 'not found'
  }

  const getCurrentBreakpointColor = (): string => {
    if (isBase) return 'gray.200'
    if (isSM) return 'red.200'
    if (isMd) return 'yellow.200'
    if (isLg) return 'green.200'
    if (isXl) return 'purple.200'
    if (is2Xl) return 'blue.200'
    return 'not found'
  }

  useEffect(() => {
    window.addEventListener('resize', getScreenDimensions)
    window.addEventListener('resize', getCurrentBreakpoint)

    return () => {
      window.removeEventListener('resize', getScreenDimensions)
      window.removeEventListener('resize', getCurrentBreakpoint)
    }
  })

  return (
    <Flex id={DEV_TOOL_VIEWPORT_ID} data-test-id={DEV_TOOL_VIEWPORT_ID} display={showViewport ? 'block' : 'none'}>
      <Text fontSize="xs">
        {' '}
        <Text fontSize="xs" bg={getCurrentBreakpointColor()} py={0.5} px={2} display="inline">
          <Text as="span" fontWeight="bold">
            {getCurrentBreakpoint()}: {screenDimensions.width}
          </Text>{' '}
          × {screenDimensions.height}
        </Text>
      </Text>
    </Flex>
  )
}
