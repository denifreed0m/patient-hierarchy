import { defineStore } from 'pinia'

export const useTableStore = defineStore('table', {
  state: () => ({
    deletedRows: [] as Array<string>,
    expandedRows: [] as Array<string>,
  }),

  actions: {
    deleteRow(index: string) {
      this.deletedRows.push(index)
    },

    toggleRow(index: string) {
      const existingIndex = this.expandedRows.indexOf(index)
      if (existingIndex === -1) {
        this.expandedRows.push(index)
      } else {
        this.expandedRows.splice(existingIndex, 1)
      }
    },

    resetState() {
      this.deletedRows = []
      this.expandedRows = []
    },
  },
})
