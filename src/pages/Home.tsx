import todoIllustration from '../assets/images/undraw_chore_list_re_2lq8.svg'
import {
  ShareIcon,
  DeviceMobileIcon,
  EyeOffIcon,
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="pt-10">
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
          <button className="font-WorkSans bg-red-400 hover:bg-blue-300 text-gray-100 text-lg font-semibold rounded-lg py-2 px-6 mx-auto">
            <Link to={'/list'}>Start your list for free!</Link>
          </button>
        </div>
        <img
          className="my-10 sm:my-auto mx-auto w-3/5 sm:m-0 sm:w-4/5"
          src={todoIllustration}
          alt="todo list"
        />
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
export default Home
