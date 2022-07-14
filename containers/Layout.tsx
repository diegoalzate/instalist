import Footer from './Footer'
import Header from './Header'

type IProps = {
  children: React.ReactNode
}

const WebLayout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <div className="pt-12 min-h-screen">{children}</div>
      <Footer />
    </>
  )
}

export default WebLayout
