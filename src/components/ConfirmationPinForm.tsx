import React from 'react'

//UI
import { PinInput, PinInputField } from '@chakra-ui/react'

interface IState {
  loading: boolean
  error: any
  phone?: any
  success?: boolean
  handleConfirm: (token: string) => void
}


const ConfirmationPinForm = ({ handleConfirm }: IState) => {
  const [token, setToken] = React.useState("")

  const handleChange = (value: string) => {
    setToken(value)
  }

  const handleComplete = (value: string) => {
    if (value.length === 6) {
      try {
        handleConfirm(token)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // const onSubmit = (event: React.FormEvent) => {
  //   e.preventDefault()
  //   const {
  //     password,
  //     phone,
  //   } = formState.values
  //   if (!formState.isValid) {
  //     return
  //   }
  //   try {
  //     signUpHandler(phone, password)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
          <h2 className="text-xl font-bold mb-10 text-red-400">
            Confirmation
          </h2>
            <div>
              <label className="block mb-1 font-bold text-sm text-gray-500">
                  Verify Code
              </label>
              <PinInput placeholder='-' value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </div>    
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPinForm