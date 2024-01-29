<template>
    <div class="grid grid-cols-2">
        <label
          class="bg-blue-600 text-white rounded px-3 py-1 flex gap-2 items-center select-none"
          title="If locked, image not selectable"
        >
            <input 
              v-model="config.isLock"
              type="checkbox" 
              class="bg-transparent"
            />
            Lock
        </label>
        <label
          class="bg-blue-600 text-white rounded px-3 py-1 flex gap-2 items-center select-none"
          title="If show, image can show, otherwise not"
        >
            <input 
              type="checkbox"
              class="bg-transparent"
              v-model="config.isShow"
            />
            Show
        </label>
    </div>
</template>

<script setup>
  defineProps({
    config: Object
  })
</script>