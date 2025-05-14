import type { TableRow, TableData } from '~/types'

export function useDataTransformation() {
  function transformData(data: TableRow[], title: string): TableData {
    const result: TableData = {
      title: title,
      columns: Object.keys(data[0].data),
      rows: [],
    }

    for (const item of data) {
      const row: TableData['rows'][number] = {
        values: Object.values(item.data),
      }
      if (item.kids) {
        Object.entries(item.kids).forEach(([key, value]) => {
          if (value.records.length === 0) {
            return
          }
          row.kids = transformData(value.records, key)
        })
      }
      result.rows.push(row)
    }

    return result
  }

  return {
    transformData,
  }
}
