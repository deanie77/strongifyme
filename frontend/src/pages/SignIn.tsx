import {useState, useEffect} from 'react'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Text, useColorModeValue, } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginUser } from '../features/user/userSlice'
import { useNavigate, Link as ReactLink, Outlet } from 'react-router-dom'

const initialState = {
  email: '',
  password: ''
}

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initialState)

  const { email, password } = formValue

  const handleChange = (e: any) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  }

  const onUserLogin = () => {
    if (email && password) {
      dispatch(
        loginUser(formValue)
      )
      setFormValue(initialState)
      navigate('/')
    }
  }
  
  return (
    <>
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Link
              color={'green.400'}
              _hover={{
                color: 'green.600',
              }}
            >
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input placeholder="email@example.com" _placeholder={{ color: 'gray.500' }} type="email" name='email' value={email} onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input placeholder="password" _placeholder={{ color: 'gray.500' }} type="password" name='password' value={password} onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link
                  as={ReactLink}
                  to='/sign/up'
                  color={'green.400'}
                  _hover={{
                    color: 'green.600',
                  }}
                >
                  Don't have an account?
                </Link>
              </Stack>
              <Button
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.600',
                }}
                onClick={onUserLogin}
              >
                Sign in
              </Button>
              <Link
                  color={'green.400'}
                  _hover={{
                    color: 'green.600',
                  }}
                >
                  Forgot password?
                </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    <Outlet />
    </>
  )
}
