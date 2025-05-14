import { defineEventHandler } from 'h3'
import jsonData from './data.json'
import { TableRow } from '~/types'

let data = jsonData.slice() as TableRow[]

export default defineEventHandler(async event => {
  if (event.method === 'DELETE') {
    const body = await readBody(event)

    const path = (body.row as string).split('.')
    let current: any = data

    path.forEach((p, i) => {
      const index = Number(p)
      if (i === path.length - 1 && !Number.isNaN(index)) {
        current.splice(index, 1)
      } else if (!Number.isNaN(index)) {
        current = current[index]
      } else {
        current = current.kids[p].records
      }
    })
    return { success: true, message: 'done' }
  }
  return data
})
