import { Button, FormLabel, Input,  } from "@chakra-ui/react"

const CreateList = () => {
  return (
    <div className="flex flex-col items-center grow">
      <h1 className="my-4 text-xl">
        create{' '}
        <span className="underline decoration-wavy decoration-blue-400">
          list
        </span>
      </h1>
      <div className="flex flex-col sm:w-96 flex-wrap p-4 space-y-3">
          <div className="flex space-x-3">
            <div className="flex w-14 flex-col space-y-2">
              <Input id='emoji' className="grow-0 w-3" defaultValue={"⭐️"} maxLength={1} />
            </div>
            <div className="flex grow flex-col space-y-2">
              <Input className="grow" id='name' type='text' />
            </div>
          </div>
          <Button bgColor={'primary'} textColor={'whiteAlpha.900'}>
            save
          </Button>
      </div>
  </div>
  )
}

export default CreateList
