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
      if (!this.expandedRows.includes(index)) {
        this.expandedRows.push(index)
      } else {
        this.expandedRows = this.expandedRows.filter(row => row !== index)
      }
    },

    resetState() {
      this.deletedRows = []
      this.expandedRows = []
    },
  },
})
