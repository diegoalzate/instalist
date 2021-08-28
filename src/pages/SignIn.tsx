import { useState } from "react"
import { supabase } from "../client"

const SignIn = () => {
    const [submitted, setSubmitted] = useState(false)
    const [phone, setPhone] = useState('')

    async function signIn(){
        if (!phone) return

        const { error, data } = await supabase.auth.signIn({
            phone
        })
        if (error) {
            console.log({ error })
        } else {
            setSubmitted(true)
        }
    }

    if (submitted) {
        return(
            <div className="container">
                <h2>Please check your phone to sign in</h2>
            </div>
        )
    }

    return (
        <div className="container min-h-screen flex items-center justify-center">
            <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
                <h2 className="text-xl font-bold mb-10 text-red-400">Create Your Account</h2>
                <form className="space-y-8">
                    <div>
                        <label className="block mb-1 font-bold text-sm text-gray-500">Phone</label>
                        <input onChange={e => setPhone(e.target.value)} type="text" className="w-full p-3 rounded outline-none focus:border-red-400"></input>
                    </div>
                    <div className="flex items-center">
                        <label className="text-sm mr-2 text-gray-500">I agree to the terms and privacy</label>
                        <input id="agree" type="checkbox"></input>
                    </div>
                    <button onClick={() => signIn()} className="block text-gray-100 bg-red-400 w-full p-4 font-semibold 
                    rounded-lg hover:bg-blue-300 trainsition duration-300">Sign In</button>
                </form>  
            </div>
        </div>
    )   
}

export default SignIn