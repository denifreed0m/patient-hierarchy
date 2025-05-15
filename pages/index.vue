<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-if="error" class="error">Error: {{ error.message }}</div>

    <DataTable
      v-if="transformedData.rows.length > 0 || transformedData.kids"
      :data="transformedData"
      :level="0"
      :path="[]"
    />
    <div v-else class="my-6 p-6 border-0">No data</div>
  </div>
</template>

<script setup lang="ts">
  import type { ApiResponse } from '~/types'
  import { useDataTransformation } from '~/composables/useDataTransformation'
  import { usePatientDeletion } from '~/composables/usePatientDeletion'

  const { transformData } = useDataTransformation()
  const { time } = usePatientDeletion()

  const { data, pending, error } = await useFetch<ApiResponse>('/api/patients', {
    watch: [time],
  })

  const transformedData = computed(() => {
    if (!data.value) {
      return {
        title: 'Root',
        columns: [],
        rows: [],
        kids: undefined,
      }
    }
    return transformData(data.value, 'Root')
  })
</script>
