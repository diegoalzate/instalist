import { Divider } from '@chakra-ui/react'
import { Fragment } from 'react'
import { RouteChildrenProps } from 'react-router'
import Footer from './Footer'
import Header from './Header'

type IProps = {
  children: RouteChildrenProps<any> | React.ReactNode
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
