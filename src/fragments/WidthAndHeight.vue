<template>
    <div class="grid grid-cols-2">
        <Input 
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="imageData.width"
          placeholder="Width"
          label="Width"
        />
        <Input 
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="imageData.height"
          placeholder="Height"
          label="Height"
        />
    </div>
</template>

<script setup>
    import { inject } from 'vue'
    import Input from '@/components/Input.vue'

    const { imageData } = inject('useConfig')
</script>