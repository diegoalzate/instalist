import { Fragment } from 'react'
import ConfirmationPinForm from '../components/ConfirmationPinForm'

interface IState {
  loading: boolean
  error: any
  phone?: any
  success?: boolean
  handleConfirm: (token: string) => void
}

const ConfirmationPin = ({ phone, success, error, loading, handleConfirm }: IState) => {
  return (
    <Fragment>
      <ConfirmationPinForm
        loading={loading}
        error={error}
        phone={phone}
        success={success}
        handleConfirm={handleConfirm}
      />
    </Fragment>
  )
}

export default ConfirmationPin