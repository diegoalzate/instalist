const SignUp = () => {
    return (
        <div className="container min-h-screen flex items-center justify-center">
            <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 w-1/2">
                <h2>Create Your Account</h2>
                <form>
                    <div>
                        <label>Phone</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>I agree to the terms and privacy</label>
                        <input id="agree" type="checkbox"></input>
                    </div>
                    <button>Sign Up</button>
                </form>  
            </div>
        </div>
    )   
}
export default SignUp