import { useState, useEffect } from 'react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Input, Stack, useColorModeValue, Link } from '@chakra-ui/react'
import { useAppDispatch } from '../app/hooks'
import { useNavigate, Link as ReactLink } from 'react-router-dom'
import { registerUser } from '../features/user/userSlice'

const initialState = {
  profilePicture: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}


export const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initialState)

  const { profilePicture, username, email, password, confirmPassword } = formValue

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onUserRegister = () => {
    if (username && password && email) {
      if (password === confirmPassword) {
        dispatch(
          registerUser(formValue)
        )
        setFormValue(initialState)
        navigate('/sign/in')
      }
    }
  }

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
          Sign Up
        </Heading>

        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={4}>
            <Center>
              <Avatar size="xl" src={profilePicture}>
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
          <Input name='username' value={username} placeholder="username" _placeholder={{ color: 'gray.500' }} type="text" onChange={handleChange} />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>email address</FormLabel>
          <Input placeholder="email@example.com" _placeholder={{ color: 'gray.500' }} type="email" name='email' value={email} onChange={handleChange} />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" _placeholder={{ color: 'gray.500' }} type="password" name='password' value={password} onChange={handleChange} />
        </FormControl>

        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input placeholder="Re-Enter password" _placeholder={{ color: 'gray.500' }} type="password" name='confirmPassword' value={confirmPassword} onChange={handleChange} />
        </FormControl>

        <Stack spacing={4} direction={['row', 'column']}>
          <Button
            type="button"
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}
            onClick={onUserRegister}
          >
            Sign Up
          </Button>
        </Stack>
        <Link
          as={ReactLink}
          to='/sign/in'
          color={'green.400'}
          _hover={{
            color: 'green.600',
          }}
        >
          Already have an account?
        </Link>
      </Stack>
    </Flex>
  )
}
