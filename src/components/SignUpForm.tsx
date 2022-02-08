import React, { useEffect, useState } from 'react';
import { passwordPattern, phonePattern } from '../utils/validations';
import { validate } from 'validate.js';
import { IRegistration } from '../pages/SignUp';
import { useForm } from 'react-hook-form';

// UI
import 'react-phone-number-input/style.css';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-number-input';


interface IFormInput {
  phone: string
  password: string
  termsAndConditions: number;
}

interface IFormValues {
	phone: string;
  password: string;
  termsAndConditions: number;
}

interface ITouchValues {
  phone: boolean;
  password: boolean;
  termsAndConditions: boolean;
}

interface IErrorValues {
  phone?: string[];
  password?: string[];
  termsAndConditions?: string[];
}

interface IFormState {
  isValid: boolean;
  values: IFormValues;
  touched: ITouchValues;
  errors: IErrorValues;
}

interface IState {
  loading: boolean
  error: any
  toggleRegister?: () => void
  signUpHandler: IRegistration
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
  termsAndConditions: {
    numericality: {
      noStrings: false,
      equalTo: 1,
      notEqualTo: 'must be checked',
    },
  },
}


const SignUpForm = ({ loading, signUpHandler, toggleRegister }: IState) => {
  const { register } = useForm<IFormInput>()
  const [formState, setFormState] = useState<IFormState>({
    isValid: false,
    values: {
      phone: '',
      termsAndConditions: 0,
      password: '',
    },
    touched: {
      phone: false,
      termsAndConditions: false,
      password: false,
    },
    errors: {},
  });

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [name]: +checked,
      },
      touched: {
        ...formState.touched,
        [name]: true,
      },
    });
  };
  
  const handlePhoneChange = (value: string) => {
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const {
      password,
      phone,
    } = formState.values
    if (!formState.isValid) {
      return
    }
    try {
      signUpHandler(phone, password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
          <h2 className="text-xl font-bold mb-10 text-red-400">
            Sign Up
          </h2>
          {
            <form className="space-y-8" onSubmit={onSubmit}>
            <div className="form-item">
              <label className="block mb-1 font-bold text-sm text-gray-500">
                Phone
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                value={formState.values.phone}
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
                className="w-full"
                disabled={!loading ? false : true}
                value={formState.values.password}
                tabIndex={-1}
                onChange={handleChange}
              />
              {formState.errors &&
                formState.touched.password &&
                (formState.errors.password || []).map((err, index) => (
                  <p className="text-red-500" key={index}>
                    {err}
                  </p>
                ))}
            </div>
            <div className="form-item flex items-center">
              <label className="text-xs mr-2 text-gray-500">
                I agree to the terms and privacy
              </label>
              <input
                id="agree"
                name="termsAndConditions"
                type="checkbox"
                className="text-red-400"
                value={formState.values.termsAndConditions}
                onChange={handleCheckboxChange}
              />
            </div>
            <button
              disabled={!formState.isValid}
              className={
                !formState.isValid
                  ? 'block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-full p-4 font-semibold '
                  : 'block text-gray-100 rounded-lg hover:bg-blue-300  bg-red-400 w-full p-4 font-semibold '
              }
            >
              {loading ? <CgSpinner size={20} className="a-spinner" /> : 'Send'}
            </button>
              <div className="form-item text-center mb-8 md:col-start-2 lg:col-start-2 md:col-span-2 lg:col-auto">
                <button type="button" onClick={toggleRegister} className="font-light text-red-400 hover:underline">I have an account</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  );
}

export default SignUpForm