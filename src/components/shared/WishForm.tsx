import { Collapse, Flex, IconButton, Input, useDisclosure } from '@chakra-ui/react'
import { LinkIcon, PlusIcon, XIcon } from '@heroicons/react/outline'

interface IWishForm {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  url: string
}

const WishForm = ({ value, handleChange, onClick, url }: IWishForm) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <div className='flex flex-col w-72 sm:w-96' >
          <Flex flexDirection={'row'} justifyContent={'space-between'} >
        <Input
          name="wish"
          onChange={handleChange}
          value={value}
          focusBorderColor="red.200"
          placeholder="Write wish here"
          mr="4" 
       
        />
      <div className='flex'>
      <IconButton
        aria-label="Add link"
        icon={isOpen ? <XIcon className='max-h-4'/>  : <LinkIcon className="max-h-4" />}
        className="mr-2"
        onClick={onToggle}
      />
      <IconButton
        aria-label="Add wish"
        bgColor={'red.400'}
        textColor={'white'}
        icon={<PlusIcon className="max-h-4" />}
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
