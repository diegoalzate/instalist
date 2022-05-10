import React, { useEffect, useState } from 'react';
// import { supabase } from '../client';
import { passwordPattern, phonePattern } from '../utils/validations';
import PhoneInput from 'react-phone-number-input';
import { validate } from 'validate.js';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form'

// UI
import { CgSpinner } from 'react-icons/cg';
import 'react-phone-number-input/style.css';


interface IFormInput {
  phone: string
  password: string
}

interface IFormValues {
	phone: string;
  password: string;
}

interface ITouchValues {
  phone: boolean;
  password: boolean;
}

interface IErrorValues {
  phone?: string[];
  password?: string[];
}
interface IFormState {
  isValid: boolean;
  values: IFormValues;
  touched: ITouchValues;
  errors: IErrorValues;
}

export interface IState {
  loading: boolean
  error: any
  success?: boolean
  toggleRegister: () => void
  signInHandler: (email: string, password: string) => void
}

const schema = {
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
  password: {
    presence: {
      allowEmpty: false,
      message: 'is required',
    },
    format: {
      pattern: passwordPattern,
      message: 'at least one letter and one number',
    },
    length: {
      min: 8,
    },
  },
};

const LoginForm = ({ signInHandler, toggleRegister, error, loading }: IState) => {
  const history = useHistory()
  const { isAuthenticated } = useAuth()
  const { register } = useForm<IFormInput>()
  const [formState, setFormState] = useState<IFormState>({
    isValid: false,
    values: {
      phone: '',
      password: '',
    },
    touched: {
      phone: false,
      password: false,
    },
    errors: {},
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/list')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    const errors: Object = validate(formState.values, schema);
    setFormState({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    });
    // eslint-disable-next-line
  }, [formState.values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }))
  }

  const handlePhoneChange = (value: any) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        phone: value,
      },
      touched: {
        ...formState.touched,
        phone: true,
      },
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState.isValid) {
      const { phone, password } = formState.values
      signInHandler(phone, password)
    }
    resetInputValues()
  };


  const resetInputValues = () => {
    setFormState({
      isValid: false,
      values: {
        phone: '',
        password: '',
      },
      touched: {
        phone: false,
        password: false,
      },
      errors: {},
    })
  }

  return (
    <div>
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
          <h2 className="text-xl font-bold mb-10 text-red-400">
            Login
          </h2>
          {
            <form className="space-y-8" onSubmit={onSubmit}>
            <div className="form-item">
              <label className="block mb-1 font-bold text-sm text-gray-500">
                Phone
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                value={formState.values.phone as any}
                onChange={handlePhoneChange}
              />
              {formState.errors &&
                formState.touched.phone &&
                (formState.errors.phone || []).map((err, index) => (
                  <p className="text-red-500" key={index}>
                    {err}
                  </p>
                ))}
            </div>
            <div className="form-item">
              <label className="block mb-1 font-bold text-sm text-gray-500">
                Password
              </label>
              <input
                type="password" {...register('password', { required: true })}
                className="w-full border-gray-200 border-2 rounded-lg"
                disabled={!loading ? false : true}
                value={formState.values.password}
                tabIndex={-1}
                onChange={handleChange}
              />
              {formState.errors &&
                formState.touched.password &&
                (formState.errors.password || []).map((err, index) => (
                  <p className="text-red-500 break-words"  key={index}>
                    {err}
                  </p>
                ))}
            </div>
            <button
              disabled={!formState.isValid}
              className={
                !formState.isValid
                  ? 'block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-full p-4 font-semibold '
                  : 'block text-gray-100 rounded-lg hover:bg-blue-300  bg-red-400 w-full p-4 font-semibold '
              }
            >
              {loading ? <CgSpinner size={20} className="a-spinner mx-auto" /> : 'Send'}
            </button>
              <div className="form-item text-center mb-8 md:col-start-2 lg:col-start-2 md:col-span-2 lg:col-auto">
                <button type="button" onClick={toggleRegister} className="font-light text-red-400 hover:underline">Create Account</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default LoginForm
