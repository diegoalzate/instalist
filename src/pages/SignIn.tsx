import React, { useEffect, useState } from "react"
import { supabase } from "../client"
import { phonePattern } from '../utils/validations'
import PhoneInput from 'react-phone-number-input'
import { validate } from "validate.js"
import { on } from "events"
import { CgSpinner } from 'react-icons/cg'

interface IFormValues {
    phone: string
    termsAndConditions: number
}

interface ITouchValues {
    phone: boolean
    termsAndConditions: boolean
}

interface IErrorValues {
    phone?: string[]
    termsAndConditions?: string[]
}
interface IFormState {
    isValid: boolean,
    values: IFormValues,
    touched: ITouchValues,
    errors: IErrorValues
}

const schema = {
    phone: {
        presence: {
            allowEmpty: false,
            message: 'es requerido'
        },
        format: {
            pattern: phonePattern,
            message: 'must be a valid phone number',
        },
        length: {
            max: 20
        }
    },
    termsAndConditions: {
        numericality: {
            noStrings: false,
            equalTo: 1,
            notEqualTo: "must be checked"
        }
    }
}


const SignIn = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [phone, setPhone] = useState('')
    const [formState, setFormState] = useState<IFormState>({
        isValid: false,
        values: {
            phone: phone ? phone : '',
            termsAndConditions: 0,
        },
        touched: {
            phone: false,
            termsAndConditions: false,
        },
        errors: {}
    })

    useEffect(() => {
        const errors: Object = validate(formState.values, schema)
        setFormState({
            ...formState,
            isValid: !errors,
            errors
        })
    }, [formState.values])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        console.log(name)
        setFormState({
            ...formState,
            values: {
                ...formState.values,
                [name]: +checked
            },
            touched: {
                ...formState.touched,
                [name]: true
            }
        })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormState({
          ...formState,
          values: {
            ...formState.values,
            [name]: +checked
          },
          touched: {
            ...formState.touched,
            [name]: true
          }
        })
      }

    const handlePhoneChange = (value: string) => {
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

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (formState.isValid) {
            const { termsAndConditions, phone } = formState.values
            setLoading(true)
            console.log('Submitting Data')
            setLoading(true)
        }
        setLoading(false)
    }


    // async function signIn(){
    //     if (!phone) return

    //     const { error, data } = await supabase.auth.signIn({
    //         phone
    //     })
    //     if (error) {
    //         console.log({ error })
    //     } else {
    //         setSubmitted(true)
    //     }
    // }

    // if (submitted) {
    //     return (
    //         <div className="container">
    //             <h2>Please check your phone to sign in</h2>
    //         </div>
    //     )
    // }

    return (
        <div className="container min-h-screen flex items-center justify-center" >
            <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
                <h2 className="text-xl font-bold mb-10 text-red-400">Create Your Account</h2>
                <form className="space-y-8" 
                    onSubmit={onSubmit}>
                    <div className="form-item">
                        <label className="block mb-1 font-bold text-sm text-gray-500">Phone</label>
                        <PhoneInput
                            international
                            type="text"
                            value={formState.values.phone}
                            onChange={handlePhoneChange}
                        />
                        {formState.errors && formState.touched.phone && (formState.errors.phone || []).map((err, index) => (
                            <p className="text-red-500" key={index}>
                                {err}
                            </p> 
                        ))}
                    </div>
                    <div className="form-item flex items-center">
                        <label className="text-xs mr-2 text-gray-500">I agree to the terms and privacy</label>
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
                        disabled = {!formState.isValid}
                        className={ !formState.isValid 
                            ? "block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-full p-4 font-semibold "
                            : "block text-gray-100 rounded-lg hover:bg-blue-300  bg-red-400 w-full p-4 font-semibold "
                        }
                    >
                        {loading ? <CgSpinner size={20} className='a-spinner' /> : "Enviar"}
                    </button>
                </form>
            </div>
        </div >
    )
}

export default SignIn