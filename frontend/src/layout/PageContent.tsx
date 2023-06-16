import { Flex, Heading, Text } from '@chakra-ui/react'

import React from 'react'

type Props = {
  children: React.ReactNode
  dataTestId: string
  pageDescription: string
  pageHeading: string
}

export const PageContent = ({ pageHeading, pageDescription, dataTestId, children }: Props) => {
  return (
    <main>
      <Flex flexDirection="column" p={8}>
        <Heading as="h1" mb={1} data-test-id={dataTestId}>
          {pageHeading}
        </Heading>
        <Text mb={8}>{pageDescription}</Text>

        <Flex flexDirection="column" data-test-id="page-content">
          {children}
        </Flex>
      </Flex>
    </main>
  )
}
