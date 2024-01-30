<template>
    <div class="grid grid-cols-2">
        <Input 
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="config.width"
          placeholder="Width"
          label="Width"
          @input="runChromeScript"
        />
        <Input 
          type="number"
          title="Enter value in px"
          class="px-2 py-1 rounded"
          v-model="config.height"
          placeholder="Height"
          label="Height"
          @input="runChromeScript"
        />
    </div>
</template>

<script setup>
    import Input from '@/components/Input.vue'

    defineProps({
      config: Object,
      runChromeScript: Function
    })
</script>