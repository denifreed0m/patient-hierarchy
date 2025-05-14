import { ref } from 'vue'
import { useTableStore } from '~/stores/table'

export function usePatientDeletion() {
  const time = ref(0)
  const tableStore = useTableStore()

  const deleteRows = async (rowsToDelete: string[]) => {
    try {
      await useFetch('/api/patients', {
        method: 'DELETE',
        body: { row: rowsToDelete[rowsToDelete.length - 1] },
      })
      time.value++
    } catch (err) {
      console.error('Failed to delete rows:', err)
    }
  }

  watch(
    () => tableStore.deletedRows,
    newDeletedRows => {
      if (newDeletedRows.length > 0) {
        deleteRows(newDeletedRows)
      }
    },
    { deep: true }
  )

  return {
    time,
  }
}
