<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-if="error" class="error">Error: {{ error.message }}</div>

    <DataTable :data="transformedData" :level="0" :path="[]" />
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
