export interface CreateExcelDto<T> {
  data: T[]
  fileName: string
  columns: CreateExcelColumns<T>[]
}

export interface CreateExcelColumns<T> {
  key: keyof T
  header: string
  format: ColumnFormat
  width?: number
}

type ColumnFormat = 'string' | 'number' | 'date'
