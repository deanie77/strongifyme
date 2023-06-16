import { Box, Checkbox, Heading, Text } from '@chakra-ui/react'

import { LOCAL_STORAGE_DEVTOOL_VIEWPORT_SETTINGS } from '../config/constants'
import { TEXT_SETTINGS_TEXT_DESCRIPTION, TEXT_SETTINGS_TITLE } from '../localization/texts'

import { PageContent } from '../layout'

// FIXME: finish settings and show/hide devtools button
const handleViewPortSettingsChange = (e: any) => {
  const isChecked = e.target.checked
  localStorage.setItem(LOCAL_STORAGE_DEVTOOL_VIEWPORT_SETTINGS, isChecked ? 'true' : 'false')
}

export const Settings = () => {
  return (
    <PageContent
      pageHeading={TEXT_SETTINGS_TITLE}
      pageDescription={TEXT_SETTINGS_TEXT_DESCRIPTION}
      dataTestId="heading-settings"
    >
      <Box mb={8}>
        <Heading as="h2" size="lg">
          User settings
        </Heading>
        <Text>lorem</Text>
        <Text>lorem</Text>
        <Text>lorem</Text>
      </Box>
      <Box mb={8}>
        <Heading as="h2" size="lg">
          Admin settings
        </Heading>
        <Checkbox
          id="show-viewport-settings"
          data-test-id="show-viewport-settings"
          onChange={handleViewPortSettingsChange}
        >
          Show DevTools
        </Checkbox>
      </Box>
    </PageContent>
  )
}
