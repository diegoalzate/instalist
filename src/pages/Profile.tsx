import { Fragment, lazy } from 'react'

const Account = lazy(() => import('../components/Account'))

const Profile = () => {
  return (
    <Fragment>
      <Account />
    </Fragment>
  )
}

export default Profile