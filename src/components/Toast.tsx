import { toast } from 'react-toastify'

import { EToastType } from '../utils/Enums'

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 4000
}

const Toast = ({ type, message }: { type: EToastType; message: string }) => {
  switch (type) {
    case 'SUCCESS':
      toast.success(message, toastOptions)
      break
    case 'WARN':
      toast.warn(message, toastOptions)
      break
    case 'ERROR':
      toast.error(message, toastOptions)
      break
    default:
      toast.info(message, toastOptions)
  }
}

export default Toast
