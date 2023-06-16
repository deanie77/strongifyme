import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

const Answers = (props: any) => {

  const handleClick = () => {
    props.onSelected(props.itemID)
  }

  return (
    <Flex key={props.itemID} id={props.itemID} onClick={handleClick} py={2} px={4} cursor='pointer' _hover={{ bg: 'green.200' }}>{props.answer}</Flex>
    )
}

export default Answers