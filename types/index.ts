export interface TableRow {
  data: Record<string, string>
  kids: Record<string, { records: TableRow[] }>
}
export type ApiResponse = TableRow[]

export interface TableData {
  title: string
  columns: string[]
  rows: Array<{
    values: string[]
    kids?: TableData
  }>
}
