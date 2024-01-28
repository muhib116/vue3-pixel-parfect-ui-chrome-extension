<template>
    <div class="grid grid-cols-2">
        <Input
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="imageData.left"
          placeholder="Left Position"
          label="Left Position"
        />
        <Input
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="imageData.top"
          placeholder="Top Position"
          label="Top Position"
        />
    </div>
</template>

<script setup>
    import { inject } from 'vue'
    import Input from '@/components/Input.vue'

    const { imageData } = inject('useConfig')
</script>