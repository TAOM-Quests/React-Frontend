declare module 'toaster-ui' {
  export type ToastType =
    | 'default'
    | 'level-up'
    | 'experience'
    | 'achievement'
    | string

  export interface ToastOptions {
    duration?: number
    autoClose?: boolean
    styles?: Record<string, string>
    allowHtml?: boolean
  }

  export default class ToasterUi {
    constructor()
    addToast(content: string, type?: ToastType, options?: ToastOptions): string
    updateToast(
      id: string,
      newContent?: string,
      newType?: ToastType | null,
      newOptions?: ToastOptions,
    ): void
  }
}
