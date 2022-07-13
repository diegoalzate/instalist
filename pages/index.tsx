import todoIllustration from '../assets/images/undraw_chore_list_re_2lq8.svg'
import {
  ShareIcon,
  DeviceMobileIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useProfile } from '../hooks'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
const Home = () => {
  const history = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/list')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])
  return (
    <div className="pt-10">
      <AlertProfile />
      <section
        id="home-page"
        className="p-4 grid grid-cols-1 sm:grid-cols-2 justify-center gap-4"
      >
        <div className="flex flex-col gap-6 sm:gap-10 sm:my-10 text-center sm:text-left sm:ml-auto">
          <h2 className="text-4xl font-bold text-red-400 sm:text-6xl">
            Keep track of everything you want on Instagram
          </h2>
          <p>
            "It's a wishlist for instagram, it's not rocket science." - dev team
          </p>
          <Link href={'/list'}>
            <button className="font-WorkSans bg-red-400 hover:bg-blue-300 text-gray-100 text-lg font-semibold rounded-lg py-2 px-6 mx-auto">
              Start your list for free!
            </button>
          </Link>
        </div>
        <div className="my-10 sm:my-auto mx-auto w-3/5 sm:m-0 sm:w-4/5"
          >
          {todoIllustration}
        </div>
       
      </section>
      <section
        id="features"
        className="bg-red-400 p-4 w-full text-gray-100 text-center"
      >
        <h2 className="text-xl font-bold sm:text-left">Features</h2>
        <div className="flex flex-col md:flex-row m-3 gap-6">
          <Feature
            featureIcon={<ShareIcon />}
            featureTitle="Share your list with your imaginary friends"
          />
          <Feature
            featureIcon={<DeviceMobileIcon />}
            featureTitle="Update your list on any device"
          />
          <Feature
            featureIcon={<EyeOffIcon />}
            featureTitle="Set your list as private if you feel ashamed about what you like"
          />
        </div>
      </section>
    </div>
  )
}
interface IFeatureProps {
  featureTitle: string
  featureIcon: JSX.Element
}

const Feature = ({ featureTitle, featureIcon }: IFeatureProps) => {
  return (
    <div className="flex-1">
      <h3 className="font-medium">{featureTitle}</h3>
      <div className="h-10 w-10 mx-auto mt-3">{featureIcon}</div>
    </div>
  )
}

const AlertProfile = () => {
  const { data } = useProfile()
  return !data?.email ? (
    <Link href={'/profile'}>
      <div className="bg-blue-300 space-x-4 text-gray-50 flex justify-center items-center   w-screen absolute top-10 text-center h-12 rounded-b-md ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <p className="font-bold">Finish up your profile</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  ) : null
}
export default Home
