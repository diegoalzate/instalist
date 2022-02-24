import PhoneInput from 'react-phone-number-input';
import Avatar from '../assets/images/avatar.webp'
import 'react-phone-number-input/style.css';
import { E164Number } from 'libphonenumber-js/types';
import { phonePattern } from '../utils/validations';
import { useEffect, useState } from 'react';
import validate from 'validate.js';
import { CgSpinner } from 'react-icons/cg';

interface IFormValues {
  [key: string]: string | number | boolean | undefined
  name?: string
  phone?: string
  email?: string
  age?: number
  sex?: string
}

interface ITouchValues {
  [key: string]: string | number | boolean | undefined
  name?: boolean
  phone?: boolean
  email?: boolean
  age?: boolean
  sex?: boolean
}

interface IErrorValues {
  [key: string]: string[] | undefined
  name?: string[]
  phone?: string[]
  email?: string[]
  age?: string[]
  sex?: string[]
}

interface IFormState {
  isValid: boolean
  values: IFormValues
  touched: ITouchValues
  errors: IErrorValues
}

type CompleteRegistrationHandler = (
  name: string,
  phone: string,
  email: string,
  age: number,
  sex: string,
) => void

const schema = {
  name: {
    length: {
      maximum: 100,
    },
  },
  email: {
    email: true,
    length: {
      maximum: 64,
    },
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    format: {
      pattern: phonePattern,
      message: 'must be a valid phone number',
    },
    length: {
      max: 20,
    },
  },
  age: {
    length: {
      maximum: 10
    }
  },
  sex: {
    length: {
      maximum: 64
    }
  },
}

const Account = () => {
  const [loading, setLoading] = useState(false)
  const [sex, setSex] = useState<String>('')
  const [formState, setFormState] = useState<IFormState>({
    isValid: false,
    values: {
      name: '',
      phone: '',
      email: '',
      age: 0,
      sex: '',
    },
    touched: { 
      name: false,
      phone: false,
      email: false,
      age: false,
      sex: false,
    },
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema)
    setFormState({
      ...formState,
      isValid: !errors,
      errors
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [name]: value
      },
      touched: {
        ...formState.touched,
        [name]: true
      }
    })
  }

  const handlePhoneChange = (value: E164Number) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        phone: value
      },
      touched: {
        ...formState.touched,
        phone: true,
      },
    }))
  }

  const handleSex = (value: string) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        sex: value
      },
      touched: {
        ...formState.touched,
        sex: true,
      },
    }))
    setSex(value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formState.isValid) {
      setLoading(true)
      
      const formValues = formState.values
      // const userGraph = (await API.graphql({ query: getTravelerByEmail, variables: { email: formValues.email } }) as { data: GetTravelerByEmailQuery })
      console.log(formValues)

      console.log('Sending Contact Data')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex py-10 items-center justify-center">
      <div className="border-gray-200 border-2 p-8 shadow-2x1 bg-white w-1/2 nt-10 rounded-lg">
        <div className="flex items-center pt-10 flex-col">
          <div className='-z-10'>
            <img src={Avatar} className="rounded-full border-solid border-red-400 border-4 scale-75"/>
          </div>
          <h2 className="text-xl font-bold mb-10 text-red-400">
            My Profile
          </h2>
        </div>
        <form className='space-y-8' onSubmit={onSubmit}>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Name
            </label>
            <input
              type="text"
              className="w-full border-gray-200 border-2 rounded-lg"
              tabIndex={-1}
              placeholder='Name'
              name="name"
              onChange={handleChange}
              value={formState.values.name}
            />
            {formState.errors && formState.touched.name &&
              (formState.errors.name || []).map((err, index) => (
                <p className="text-red-400" key={index}>
                  {err}
                </p>
            ))}
          </div>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500 ">
              Phone
            </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={formState.values.phone as E164Number}
              onChange={handlePhoneChange}
            />
            {formState.errors && formState.touched.phone &&
              (formState.errors.phone || []).map((err, index) => (
                <p className="text-red-400" key={index}>
                  {err}
                </p>
            ))}
          </div>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Email
            </label>
            <input
              type="text"
              className="w-full border-gray-200 border-2 rounded-lg"
              tabIndex={-1}
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={formState.values.email}
            />
            {formState.errors && formState.touched.email &&
              (formState.errors.email || []).map((err, index) => (
                <p className="text-red-400" key={index}>
                  {err}
                </p>
            ))}
          </div>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Age (Years)
            </label>
            <input
              type="text"
              className="w-full border-gray-200 border-2 rounded-lg"
              tabIndex={-1}
              placeholder='Age (Years)'
              name='age'
              onChange={handleChange}
              value={formState.values.age}
            />
            {formState.errors && formState.touched.age &&
              (formState.errors.age || []).map((err, index) => (
                <p className="text-red-400" key={index}>
                  {err}
                </p>
            ))}
          </div>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Sex
            </label>
            <div className='border-gray-200 border-2 rounded-lg'>
              <button type="button" onClick={() => handleSex('male')} className="rounded-l text-gray-500 inline-block px-6 py-2.5 bg-white w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 focus:bg-red-400 focus:outline-none focus:text-gray-100 focus:ring-0 active:bg-red-400 transition duration-150 ease-in-out">Male</button>
              <button type="button" onClick={() => handleSex('female')} className=" rounded-r text-gray-500 inline-block px-6 py-2.5 bg-white w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 focus:bg-red-400 focus:outline-none focus:text-gray-100 focus:ring-0 active:bg-red-400 transition duration-150 ease-in-out">Female</button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button
                disabled={!formState.isValid}
                className={
                  !formState.isValid ? 'block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-1/2 p-4 font-semibold'
                  : 'block text-red-400 rounded-lg border-2 bg-gray-100 w-1/2 p-4 font-semibold hover:bg-red-300 hover:text-gray-100 '
                }
              >
                {loading ? <CgSpinner size={20} className='a-spinner' /> : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Account