import Avatar from '../public/images/avatar.webp'
import { useEffect, useState } from 'react';
import validate from 'validate.js';
import { CgSpinner } from 'react-icons/cg';
import { supabase } from '../client';
import { IUser } from '../utils/types';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
import { queryClient } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useProfile } from '@/hooks';

// eslint-disable-next-line 
validate.validators.email.PATTERN = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_{|}~-]+(?:.[a-z0-9\u007F-\uffff!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$|^$/i;

interface IFormValues {
  [key: string]: string | number | boolean | undefined
  name?: string
  email?: string
  age?: number
  sex?: string
}

interface ITouchValues {
  [key: string]: string | number | boolean | undefined
  name?: boolean
  email?: boolean
  age?: boolean
  sex?: boolean
}

interface IErrorValues {
  [key: string]: string[] | undefined
  name?: string[]
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

const schema = {
  name: {
    presence: {
      allowEmpty: true,
    },
    length: {
      maximum: 100,
    },
  },
  email: { 
    email: true,
    presence: {
      allowEmpty: true,
    },
    length: {
      maximum: 64,
    },
  },
  age: {
    presence: {
      allowEmpty: true,
    },
  },
  sex: {
    presence: {
      allowEmpty: true,
    },
    length: {
      maximum: 64
    }
  },
}


const Account = () => {
  const { session } = useAuth()
  const {data: user} = useProfile();
  const [loading, setLoading] = useState(false)
  const [sex, setSex] = useState<String>('')
  const history = useRouter()
  const { isAuthenticated } = useAuth()
  const [formState, setFormState] = useState<IFormState>({
    isValid: false,
    values: {
      name: '',
      age: 0,
      sex: '',
    },
    touched: { 
      name: false,
      email: false,
      age: false,
      sex: false,
    },
    errors: {}
  })
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])
  useEffect(() => {
    if (user?.email) {
      setFormState((formState) => ({
        ...formState,
        values: {
          email: user?.email,
          name: user?.name ?? '',
          age: +(user?.age ?? 0),
          sex: user?.sex ?? '',
        }
      }))
    }
    setSex(user?.sex ?? '')
  }, [user])
  
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
  const checkTouched = () => {
    return formState.touched.age || 
    formState.touched.email || 
    formState.touched.name ||
    formState.touched.sex
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (formState.isValid && checkTouched()) {
      const {phone, ...formValues} = formState.values

      console.log(formValues)

      const { data, error } = await supabase
        .from('profiles')
        .update(formValues)
        .eq('id', session?.user?.id)
      if (data) {
        await queryClient.invalidateQueries("Profile");
      } else {
        console.log(error)
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex py-10 items-center justify-center">
      <div className="border-gray-200 border-2 p-8 shadow-2x1 bg-white w-1/2 nt-10 rounded-lg">
        <div className="flex items-center pt-10 flex-col">
          <div className='-z-10'>
            <Image src={Avatar} alt="avatar" className="rounded-full border-solid border-red-400 border-4 scale-75"/>
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
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Email
            </label>
            <input
              type="text"
              className="w-full border-gray-200 border-2 rounded-lg"
              tabIndex={-1}
              placeholder='Email'
              name='email'
              readOnly
              value={user?.email}
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
              <button type="button" onClick={() => handleSex('male')} className={
                sex === 'male' ? 
                "rounded-l inline-block px-6 py-2.5 w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 bg-red-400 outline-none text-gray-100 ring-0 active:bg-red-400 transition duration-150 ease-in-out"
                :
                "rounded-l text-gray-500 inline-block px-6 py-2.5 bg-white w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 active:bg-red-400 transition duration-150 ease-in-out"}>Male</button>
              <button type="button" onClick={() => handleSex('female')} className={
                sex === 'female' ? 
                "rounded-r inline-block px-6 py-2.5 w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 bg-red-400 outline-none text-gray-100 ring-0 active:bg-red-400 transition duration-150 ease-in-out"
                :
                "rounded-r text-gray-500 inline-block px-6 py-2.5 bg-white w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 active:bg-red-400 transition duration-150 ease-in-out"
              }>Female</button>
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