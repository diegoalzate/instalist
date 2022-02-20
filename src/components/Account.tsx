import PhoneInput from 'react-phone-number-input';
import Avatar from '../assets/images/avatar.webp'
import 'react-phone-number-input/style.css';
import { E164Number } from 'libphonenumber-js/types';

const Account = () => {
  return (
    <div className="min-h-screen flex py-10 items-center justify-center">
      <div className="border-gray-200 border-2 p-8 shadow-2x1 bg-white w-1/2 nt-10 rounded-lg">
        <div className="flex items-center pt-10 flex-col">
          <img src={Avatar} className="rounded-full border-solid border-red-400 border-4 scale-75"/>
          <h2 className="text-xl font-bold mb-10 text-red-400">
            My Profile
          </h2>
        </div>
        <form className='space-y-8'>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Name
            </label>
            <input
                type="text"
                className="w-full border-gray-200 border-2 rounded-lg"
                tabIndex={-1}
                placeholder='Name'
              />
          </div>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500 ">
              Phone
            </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={"+573024318825" as E164Number}
              onChange={() => (console.log('hola'))}
            />
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
              />
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
              />
          </div>
          <div className="form-item">
            <label className="block mb-1 font-bold text-sm text-gray-500">
              Sex
            </label>
            <div className='border-gray-200 border-2 rounded-lg'>
              <button type="button" className="rounded-l text-gray-500 inline-block px-6 py-2.5 bg-white w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 focus:bg-red-400 focus:outline-none focus:text-gray-100 focus:ring-0 active:bg-red-400  transition duration-150 ease-in-out">Male</button>
              <button type="button" className=" rounded-r text-gray-500 inline-block px-6 py-2.5 bg-white w-1/2 leading-tight font-semibold hover:bg-red-300 hover:text-gray-100 focus:bg-red-400 focus:outline-none focus:text-gray-100 focus:ring-0 active:bg-red-400 transition duration-150 ease-in-out">Female</button>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button
                disabled={true}
                className={
                    'block disabled:opacity-50 text-red-400 rounded-lg border-2 bg-gray-100 w-1/2 p-4 font-semibold '
                }
              >
                Save
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Account