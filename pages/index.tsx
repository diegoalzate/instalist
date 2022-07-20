/* eslint-disable react/no-unescaped-entities */
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import {
  BellIcon, DeviceMobileIcon,
  EyeOffIcon, ShareIcon, XCircleIcon
} from '@heroicons/react/outline'
import { useUser } from '@supabase/auth-helpers-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Home = () => {
  const history = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      history.push('/list')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return (
    <div className="pt-10">
      <section
        id="home-page"
        className="p-4 grid grid-cols-1 justify-center gap-4"
      >
        <div className="flex flex-col gap-6 sm:gap-10 sm:my-10 text-center">
          <h2 className="text-4xl font-bold text-red-400 sm:text-6xl">
            Keep track of everything you want on Instagram
          </h2>
          <p>"It's a wishlist, it's not rocket science." - dev team</p>
          <Link href={'/login'}>
            <button className="font-WorkSans bg-red-400 hover:bg-blue-300 text-gray-100 text-lg font-semibold rounded-lg py-2 px-6 mx-auto">
              Start your list for free!
            </button>
          </Link>
        </div>
      </section>
      <section id="features" className="p-4 w-full text-gray-100 text-center">
        <h2 className="underline decoration-wavy decoration-blue-400 text-2xl font-WorkSans text-red-400 font-bold">
          Features
        </h2>
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
      <section id="roadmap" className="p-4 flex-col w-1/3 mx-auto sm:pt-8">
        <h2 className="underline decoration-wavy decoration-blue-400 text-2xl font-WorkSans text-center text-red-400 font-bold">
          Roadmap
        </h2>
        <List
          pt={'2'}
          spacing={3}
          display={'flex'}
          flexDir={'column'}
          textAlign={'left'}
        >
          <ListItem>
            <ListIcon as={XCircleIcon} color="red.500" />
            edit lists
          </ListItem>
          <ListItem>
            <ListIcon as={XCircleIcon} color="red.500" />
            allow users to favorite items and lists
          </ListItem>
          <ListItem>
            <ListIcon as={XCircleIcon} color="red.500" />
            handle lists with discord bot
          </ListItem>
          <ListItem>
            <ListIcon as={BellIcon} color="yellow.500" />
            check any extra issues in the github
          </ListItem>
        </List>
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
    <motion.div
      drag
      dragConstraints={{
        top: -10,
        left: -20,
        right: 20,
        bottom: 10,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex-1 flex-col space-y-2 bg-red-400 shadow-xl rounded-xl p-4"
    >
      <h3 className="font-medium">{featureTitle}</h3>
      <div className="w-10 mx-auto">{featureIcon}</div>
    </motion.div>
  )
}

export default Home
