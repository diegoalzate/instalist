import { Flex, IconButton, Input, Spacer, VStack } from '@chakra-ui/react'
import { LinkIcon, PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'

interface IWishForm {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  url: string
}

const WishForm = ({ value, handleChange, onClick, url }: IWishForm) => {
  const [showLink, setShowLink] = useState(true)

  return (
    <Flex flexDirection={'row'}>
      <VStack mr="4">
        <Input
          name="wish"
          onChange={handleChange}
          value={value}
          focusBorderColor="red.200"
          placeholder="Write wish here"
        />
        <Input
          name="url"
          onChange={handleChange}
          hidden={showLink}
          value={url}
          focusBorderColor="red.200"
          placeholder="url"
        />
      </VStack>
      <IconButton
        aria-label="Add link"
        icon={<LinkIcon className="max-h-4" />}
        className="mr-2"
        onClick={() => {
          setShowLink((prev) => !prev)
        }}
      />
      <IconButton
        aria-label="Add wish"
        bgColor={'red.400'}
        textColor={'white'}
        icon={<PlusIcon className="max-h-4" />}
        onClick={onClick}
      />
    </Flex>
  )
}

export default WishForm
