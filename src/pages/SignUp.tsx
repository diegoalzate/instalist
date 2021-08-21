const SignUp = () => {
    return (
        <div className="container min-h-screen flex items-center justify-center">
            <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 w-2/3">
                <h2 className="text-xl font-bold mb-10 text-red-400">Create Your Account</h2>
                <form className="space-y-8">
                    <div>
                        <label className="block mb-1 font-bold text-sm text-gray-500">Phone</label>
                        <input type="text" className="w-full p-3 rounded outline-none focus:border-red-400"></input>
                    </div>
                    <div className="flex items-center">
                        <label className="text-sm mr-2 text-gray-500">I agree to the terms and privacy</label>
                        <input id="agree" type="checkbox"></input>
                    </div>
                    <button className="block text-gray-100 bg-red-400 w-full p-4 font-semibold 
                    rounded-lg hover:bg-blue-300 trainsition duration-300">Sign Up</button>
                </form>  
            </div>
        </div>
    )   
}
export default SignUp