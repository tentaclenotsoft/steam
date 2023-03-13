export * from './User'
export * from './Level'

export interface IToast {
  open: boolean
  setOpen?(open: boolean): void
  title: string
  message: string
  duration?: number
}
