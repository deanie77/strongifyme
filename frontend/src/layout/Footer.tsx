import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Flex, Link, Text } from '@chakra-ui/react'

import { LAYOUT_CONTENT } from '../config/constants'
import { URL_GITHUB_AUTHOR_KRSIAK } from '../config/urls'
import { TEXT_APP_NAME, TEXT_AUTHOR_KRSIAK, TEXT_MADE_BY } from '../localization/texts'
import { getCurrentYear } from '../utils'

export const Footer = () => {
  return (
    <footer>
      <Flex
        ml={{ base: 0, md: LAYOUT_CONTENT }}
        backgroundColor="gray.100"
        minH="64px"
        alignItems="center"
        borderTop="1px"
        borderColor="gray.200"
        px={8}
      >
        <Text align="center" color="gray.700">
          © {getCurrentYear()} {TEXT_APP_NAME} | {TEXT_MADE_BY}{' '}
          <Link href={URL_GITHUB_AUTHOR_KRSIAK} isExternal color="green.500">
            {TEXT_AUTHOR_KRSIAK}
            <ExternalLinkIcon mx={1} />
          </Link>
        </Text>
      </Flex>
    </footer>
  )
}
