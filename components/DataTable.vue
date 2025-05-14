<template>
  <div :style="{ marginLeft: `${props.level * 1}rem` }" class="bg-white my-6 p-6 border-0">
    <h3 class="text-lg font-semibold mb-4 text-red-700">{{ props.data.title }}</h3>
    <table class="w-full border-separate border-spacing-0 bg-white">
      <thead>
        <tr>
          <th
            v-for="column in props.data.columns"
            :key="column"
            class="bg-gray-50 text-gray-600 font-semibold px-4 py-2 border-b-2 border-gray-200 text-left"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(row, i) in props.data.rows" :key="getKey(i)">
          <tr
            :class="[
              expandedRows.includes(getIndex(i)) ? 'bg-gray-100' : '',
              'hover:bg-gray-50 transition-colors',
            ]"
          >
            <td
              v-for="(cell, index) in row.values"
              :key="cell"
              class="px-4 py-2 border-b border-gray-100 text-gray-800"
            >
              <div class="flex items-center">
                <UIcon
                  v-if="row.kids && row.kids.rows.length > 0 && index === 0"
                  :name="'i-heroicons-chevron-right'"
                  class="text-gray-400 text-lg transition-transform duration-200 cursor-pointer"
                  :class="{ 'rotate-90': expandedRows.includes(getIndex(i)) }"
                  @click="toggleRow(getIndex(i))"
                />
                <span :class="{ 'ml-[20px]': !row.kids && index === 0 }">{{ cell }}</span>
                <UIcon
                  v-if="index === row.values.length - 1"
                  name="i-heroicons-x-mark"
                  class="ml-auto text-gray-400 hover:text-red-500 cursor-pointer"
                  @click="tableStore.deleteRow(getIndex(i))"
                />
              </div>
            </td>
          </tr>
          <tr v-if="row.kids && row.kids.rows.length > 0 && expandedRows.includes(getIndex(i))">
            <td colspan="100%">
              <DataTable
                :data="row.kids"
                :level="props.level + 1"
                :path="[...props.path, i.toString(), row.kids.title]"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { TableData } from '~/types'
  import { useTableStore } from '~/stores/table'
  import { storeToRefs } from 'pinia'

  interface Props {
    data: TableData
    loading?: boolean
    level?: number
    path: string[]
  }

  function getKey(index: number) {
    return (
      props.path.join('.') +
      (props.path.length > 0 ? '.' : '') +
      index +
      '-' +
      props.data.rows[index].values[0]
    )
  }

  function getIndex(index: number) {
    return props.path.join('.') + (props.path.length > 0 ? '.' : '') + index
  }

  const tableStore = useTableStore()
  const { expandedRows } = storeToRefs(tableStore)

  function toggleRow(index: string) {
    tableStore.toggleRow(index)
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: false,
    level: 0,
  })
</script>
