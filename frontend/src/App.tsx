import { ChakraProvider, theme } from '@chakra-ui/react'

import { AppLayout } from './layout'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppLayout />
    </ChakraProvider>
  )
}
