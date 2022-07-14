import React from 'react'

//UI
import { PinInput, PinInputField } from '@chakra-ui/react'
import { CgSpinner } from 'react-icons/cg'

interface IState {
  loading: boolean
  error: any
  phone?: any
  success?: boolean
  handleConfirm: (token: string) => void
}

const ConfirmationPinForm = ({ handleConfirm, loading }: IState) => {
  const [token, setToken] = React.useState('')

  const handleChange = (value: string) => {
    setToken(value)
  }

  const handleComplete = () => {
    if (token.length === 6) {
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
          <h2 className="text-xl font-bold mb-10 text-red-400">Confirmation</h2>
          <div>
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Verify Code
            </label>
            <div className="flex flex-col space-y-2">
              <div>
                <PinInput
                  placeholder="-"
                  value={token}
                  onChange={handleChange}
                  otp
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </div>
              <button
                disabled={token.length !== 6}
                type="button"
                onClick={handleComplete}
                className={
                  token.length !== 6
                    ? 'block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-full p-4 font-semibold '
                    : 'block text-gray-100 rounded-lg hover:bg-blue-300  bg-red-400 w-full p-4 font-semibold '
                }
              >
                {loading ? (
                  <CgSpinner size={20} className="a-spinner mx-auto" />
                ) : (
                  'Send Confirmation Code'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPinForm
