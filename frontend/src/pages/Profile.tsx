import { SmallCloseIcon } from '@chakra-ui/icons'
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

export const Profile = () => {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Profile
        </Heading>

        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={4}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button
                type="button"
                w="full"
                _hover={{
                  bg: 'gray.200',
                }}
              >
                Change Icon
              </Button>
            </Center>
          </Stack>
        </FormControl>

        <FormControl id="userName" isRequired>
          <FormLabel>user name</FormLabel>
          <Input placeholder="user name" _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>email address</FormLabel>
          <Input placeholder="email@example.com" _placeholder={{ color: 'gray.500' }} type="email" />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" _placeholder={{ color: 'gray.500' }} type="password" />
        </FormControl>

        <Stack spacing={4} direction={['column', 'row']}>
          <Button
            type="button"
            w="full"
            _hover={{
              bg: 'gray.200',
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
