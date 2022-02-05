import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { phonePattern } from '../utils/validations';
import PhoneInput from 'react-phone-number-input';
import { validate } from 'validate.js';
import { CgSpinner } from 'react-icons/cg';

// UI
import 'react-phone-number-input/style.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface IFormValues {
	phone: string;
  termsAndConditions: number;
}

interface ITouchValues {
  phone: boolean;
  termsAndConditions: boolean;
}

interface IErrorValues {
  phone?: string[];
  termsAndConditions?: string[];
}
interface IFormState {
  isValid: boolean;
  values: IFormValues;
  touched: ITouchValues;
  errors: IErrorValues;
}

const schema = {
  phone: {
    presence: {
      allowEmpty: false,
      message: 'es requerido',
    },
    format: {
      pattern: phonePattern,
      message: 'must be a valid phone number',
    },
    length: {
      max: 20,
    },
  },
  termsAndConditions: {
    numericality: {
      noStrings: false,
      equalTo: 1,
      notEqualTo: 'must be checked',
    },
  },
};

const SignIn = () => {
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)
  const { isAuthenticated } = useAuth()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [optCode, setOtpCode] = useState<string>("")
  const [formState, setFormState] = useState<IFormState>({
    isValid: false,
    values: {
      phone: '',
      termsAndConditions: 0,
    },
    touched: {
      phone: false,
      termsAndConditions: false,
    },
    errors: {},
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    const errors: Object = validate(formState.values, schema);
    setFormState({
      ...formState,
      isValid: !errors,
      errors,
    });
    // eslint-disable-next-line
  }, [formState.values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (formState.isValid) {
      const { phone } = formState.values;

      let { error } = await supabase.auth.signIn({
        phone: phone
      })

      if (error) {
        console.log({ error })
        resetInputValues()
      } else {
        setIsSubmitted(true)
      }
    }
    setLoading(false);
  };

  const resetInputValues = () => {
    setFormState({
      isValid: false,
      values: {
        phone: '',
        termsAndConditions: 0
      },
      touched: {
        phone: false,
        termsAndConditions: false,
      },
      errors: {},
    })
  }

  const onSubmitVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let { session, error } = await supabase.auth.verifyOTP({
      phone: formState.values.phone,
      token: optCode,
    })

    if (error) {
      console.log({ error })
    } else {
      console.log('Logeado')
      console.log(session)
    }
    setIsSubmitted(false)
    setOtpCode('')
    resetInputValues()
  }


  return (
    <div>
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
          <h2 className="text-xl font-bold mb-10 text-red-400">
            Log In
          </h2>
          {
            !isSubmitted ?
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
                onChange={handleChange}
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
            </form>
          :
          <form className="space-y-8" onSubmit={onSubmitVerify}>
            <div className="form-item">
              <label className="block mb-1 font-bold text-sm text-gray-500">
                  Verify Code
              </label>
              <input
                id="otp"
                name="otp-input"
                type="text"
                className="text-red-400"
                value={optCode}
                maxLength={6}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </div>
            <button
              disabled={optCode.length !== 6}
              className={
                !(optCode.length === 6)
                  ? 'block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-full p-4 font-semibold '
                  : 'block text-gray-100 rounded-lg hover:bg-blue-300  bg-red-400 w-full p-4 font-semibold '
              }
            >
              {loading ? <CgSpinner size={20} className="a-spinner" /> : 'Send'}
            </button>
          </form>
          }

        </div>
      </div>
    </div>
  );
};

export default SignIn;
