import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useState } from 'react'

import { LOCAL_STORAGE_DEVTOOL_VIEWPORT, LOCAL_STORAGE_DEVTOOL_VIEWPORT_SETTINGS } from '../../config/constants'

import { DevToolViewport } from './DevToolViewport'

export const OpenDevToolsButton = () => {
  const localStorageViewportWidget = localStorage.getItem(LOCAL_STORAGE_DEVTOOL_VIEWPORT) === 'true'
  const localStorageViewportSettings = localStorage.getItem(LOCAL_STORAGE_DEVTOOL_VIEWPORT_SETTINGS) === 'true'

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showViewport, setShowViewport] = useState(localStorageViewportWidget)

  const showDevToolsButton = localStorageViewportSettings

  const handleViewPortChange = (e: any) => {
    const isChecked = e.target.checked
    setShowViewport(isChecked)
    localStorage.setItem(LOCAL_STORAGE_DEVTOOL_VIEWPORT, isChecked ? 'true' : 'false')
  }

  return (
    <>
      <Box position="relative">
        <Flex
          flexDirection="column"
          position="absolute"
          right={2}
          bottom={2}
          border="1px"
          borderColor={showViewport ? 'gray.500' : 'gray.50'}
          bg={showViewport ? 'white' : ''}
          p={2}
        >
          <VStack spacing={2} direction="column" alignItems="flex-start" divider={<Divider />}>
            {showViewport && <DevToolViewport showViewport={showViewport} />}

            <Button onClick={onOpen} size="xs" colorScheme="purple">
              Open DevTools
            </Button>
          </VStack>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>DevTools</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup>
              <VStack spacing={2} direction="column" alignItems="flex-start">
                <Checkbox
                  id="show-viewport-widget"
                  data-test-id="show-viewport-widget"
                  onChange={handleViewPortChange}
                  defaultChecked={showViewport}
                >
                  Show Viewport
                </Checkbox>
                <Checkbox value="clear-local-storage" isDisabled>
                  Clear Local Storage
                </Checkbox>
                <Checkbox value="DevTool 3" isDisabled>
                  DevTool 3
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
