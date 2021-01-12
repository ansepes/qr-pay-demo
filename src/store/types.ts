export interface RootState {
  LoadingStore: ILoadingState
  ModalStore: IModalState
  RoutingStore: IRoutingState
  QrReaderStore: IQrReaderState
  PayStore: IPayState
  PayEditorStore: IPayEditorState
}

// Loading
export interface ILoadingState {
  loading: boolean
}

// Modal
export interface IModalState {
  info: IModalViewState
  warn: IModalViewState
  confirm: IModalViewState
}

export interface IModalViewState {
  isShow: boolean
  title: string
  message: string
  onClose?: IModalDifferdState
}

export interface IModalDifferdState {
  resolve?: Function
  reject?: Function
}

export enum ModalCloseButtonTypes {
  Close,
  OK,
  Cancel,
}

// Routing
export interface IRoutingState {
  toPath: string | undefined
}

// QrReader
export interface IQrReaderState {
  result: string | undefined
  cameraEnable: boolean
}

// Pay
export interface IPayState {
  dialogState: IPayDialogState
  amount: number
  user: IQRUserState
}

export interface IPayDialogState {
  isShown: boolean
}

export interface IQRUserState {
  userId: string | undefined
  name: string | undefined
  yearMonth: string | undefined
  payLimitDay: string | undefined
  totalAmount: number | undefined
}

// PayEditor
export interface IPayEditorState {
  value: string
}
