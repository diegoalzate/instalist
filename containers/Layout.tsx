import { Divider } from '@chakra-ui/react'
import { Fragment } from 'react'
import Footer from './Footer'
import Header from './Header'

type IProps = {
  children: React.ReactNode
}

const WebLayout = ({ children }: IProps) => {
  return (
    <Fragment>
      <Header />
      <div className="pt-12 min-h-screen">{children}</div>
      <Divider />
      <Footer />
    </Fragment>
  )
}

export default WebLayout
