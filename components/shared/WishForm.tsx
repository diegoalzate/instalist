import {
  Collapse,
  Flex,
  IconButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckIcon, LinkIcon, XIcon } from '@heroicons/react/outline'

interface IWishForm {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  url: string
}

const WishForm = ({ value, handleChange, onClick, url }: IWishForm) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <div className="flex flex-col w-full sm:w-96 flex-wrap p-4">
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <Input
          name="wish"
          onChange={handleChange}
          value={value}
          focusBorderColor="red.200"
          placeholder="Write wish here"
          mr="4"
        />
        <div className="flex">
          <IconButton
            aria-label="Add link"
            icon={
              isOpen ? (
                <XIcon width={20} />
              ) : (
                <LinkIcon width={20} />
              )
            }
            className="mr-2"
            onClick={onToggle}
          />
          <IconButton
            aria-label="Add wish"
            bgColor={'red.400'}
            textColor={'white'}
            icon={<CheckIcon width={20} />}
            onClick={onClick}
          />
        </div>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Input
          name="url"
          onChange={handleChange}
          value={url}
          focusBorderColor="red.200"
          placeholder="url"
          w={'full'}
          mt={'2'}
        />
      </Collapse>
    </div>
  )
}

export default WishForm
